import { Octokit } from '@octokit/rest';
import { FileNode } from './store';

export async function deployToGitHub(
  token: string,
  repoName: string,
  files: FileNode[],
  fileContents: Record<string, string>
): Promise<{ url: string; message: string }> {
  const octokit = new Octokit({ auth: token });

  try {
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    const owner = user.login;

    // Check if repo exists, create if not
    let repo;
    try {
      const { data } = await octokit.repos.get({ owner, repo: repoName });
      repo = data;
    } catch (error) {
      // Repo doesn't exist, create it
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        auto_init: true,
        private: false,
      });
      repo = data;
    }

    // Get the default branch
    const { data: repoData } = await octokit.repos.get({ owner, repo: repoName });
    const defaultBranch = repoData.default_branch;

    // Get the latest commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo: repoName,
      ref: `heads/${defaultBranch}`,
    });
    const latestCommitSha = refData.object.sha;

    // Get the tree SHA from the latest commit
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo: repoName,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commitData.tree.sha;

    // Create blobs for all files
    const tree = await createGitTree(octokit, owner, repoName, files, fileContents);

    // Create a new tree
    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo: repoName,
      tree,
      base_tree: baseTreeSha,
    });

    // Create a new commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo: repoName,
      message: `Deploy from CodeBuilder Pro - ${new Date().toISOString()}`,
      tree: newTree.sha,
      parents: [latestCommitSha],
    });

    // Update the reference
    await octokit.git.updateRef({
      owner,
      repo: repoName,
      ref: `heads/${defaultBranch}`,
      sha: newCommit.sha,
    });

    return {
      url: repo.html_url,
      message: 'Successfully deployed to GitHub!',
    };
  } catch (error: any) {
    console.error('GitHub deployment error:', error);
    throw new Error(error.message || 'Failed to deploy to GitHub');
  }
}

async function createGitTree(
  octokit: Octokit,
  owner: string,
  repo: string,
  files: FileNode[],
  fileContents: Record<string, string>,
  basePath: string = ''
): Promise<any[]> {
  const tree: any[] = [];

  for (const file of files) {
    const path = basePath ? `${basePath}/${file.name}` : file.name;

    if (file.type === 'file') {
      const content = fileContents[file.path] || '';
      
      // Create blob
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64',
      });

      tree.push({
        path,
        mode: '100644',
        type: 'blob',
        sha: blob.sha,
      });
    } else if (file.type === 'folder' && file.children) {
      const childTree = await createGitTree(
        octokit,
        owner,
        repo,
        file.children,
        fileContents,
        path
      );
      tree.push(...childTree);
    }
  }

  return tree;
}

export async function createGitHubRepo(
  token: string,
  repoName: string,
  description: string = '',
  isPrivate: boolean = false
): Promise<string> {
  const octokit = new Octokit({ auth: token });

  try {
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description,
      private: isPrivate,
      auto_init: true,
    });

    return data.html_url;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create GitHub repository');
  }
}
