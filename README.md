# CodeBuilder Pro 🚀

A cutting-edge, AI-powered code editor and builder - better than Replit! Build and deploy to GitHub directly from your mobile device.

## ✨ Features

- 🎨 **Monaco Editor** - Full-featured code editor with syntax highlighting
- 🤖 **AI Assistant** - Powered by OpenRouter (free Qwen3 Coder model)
- 📁 **File Explorer** - Create, edit, and manage files and folders
- 🚀 **GitHub Integration** - Deploy directly to GitHub repositories
- 📱 **Mobile-First** - Fully responsive, works great on mobile devices
- 🌓 **Dark Mode** - Beautiful dark and light themes
- 💾 **Auto-Save** - Your code is saved as you type
- 🎯 **Multi-Language Support** - JavaScript, TypeScript, Python, and more

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Run Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Set Up API Keys

1. **OpenRouter API Key** (for AI features):
   - Visit [openrouter.ai/keys](https://openrouter.ai/keys)
   - Create a free account
   - Generate an API key
   - Add it in Settings

2. **GitHub Personal Access Token** (for deployments):
   - Visit [github.com/settings/tokens/new](https://github.com/settings/tokens/new?scopes=repo)
   - Create a token with `repo` scope
   - Add it in Settings

## 📱 Mobile Usage

CodeBuilder Pro is optimized for mobile devices:

- **File Explorer**: Tap the menu icon (☰) to open/close
- **AI Assistant**: Tap the sparkle icon (✨) to open/close
- **Code Editor**: Full-screen editing with touch support
- **Deploy**: Deploy to GitHub with one tap

## 🎯 How to Use

### Editing Code

1. Click on any file in the File Explorer
2. Start typing in the Monaco editor
3. Your changes are saved automatically

### Using AI Assistant

1. Select a file to edit
2. Open the AI Assistant panel
3. Type a prompt like:
   - "Add error handling to this function"
   - "Refactor this code to use async/await"
   - "Add comments explaining this code"
4. Click "Explain Current Code" to understand your code
5. Click "Apply Code" to insert AI suggestions

### Deploying to GitHub

1. Set your GitHub token in Settings
2. Enter a repository name
3. Click "Deploy to GitHub"
4. Your code will be pushed to a new or existing repository

## 🛠️ Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Monaco Editor** - Code editor (same as VS Code)
- **OpenRouter** - AI API (free Qwen3 Coder model)
- **Octokit** - GitHub API
- **Zustand** - State management
- **Bun** - Package manager & runtime

## 🎨 Features Comparison

| Feature | CodeBuilder Pro | Replit |
|---------|----------------|--------|
| AI Assistant | ✅ Free (OpenRouter) | ⚠️ Paid |
| GitHub Deploy | ✅ One-click | ❌ Manual |
| Mobile Support | ✅ Optimized | ⚠️ Limited |
| Offline Capable | ✅ Yes | ❌ No |
| Open Source | ✅ Yes | ❌ No |
| Cost | 🆓 Free | 💰 Paid |

## 🔧 Development

### Build for Production

```bash
bun run build
```

### Type Check

```bash
bun typecheck
```

### Lint

```bash
bun lint
```

## 📝 Environment Variables

Create a `.env.local` file (optional - keys can be set in UI):

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_key_here
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project however you like!

## 🌟 Why CodeBuilder Pro?

- **Free & Open Source**: No subscription fees
- **Privacy First**: Your code stays on your device
- **Mobile-Friendly**: Code anywhere, anytime
- **AI-Powered**: Free AI assistance with OpenRouter
- **GitHub Integration**: Deploy with one click
- **No Lock-In**: Export your code anytime

## 🚀 Deploy Your Own

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/codebuilder-pro)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/codebuilder-pro)

## 💡 Tips

- Use `Ctrl/Cmd + S` to trigger save indicator
- The AI works best with clear, specific prompts
- Deploy frequently to keep your GitHub repo updated
- Use dark mode for better battery life on mobile

## 🐛 Troubleshooting

**AI not working?**
- Check your OpenRouter API key in Settings
- Make sure you have a file selected

**Can't deploy to GitHub?**
- Verify your GitHub token has `repo` scope
- Check that the repository name is valid

**Editor not loading?**
- Try refreshing the page
- Check browser console for errors

---

Built with ❤️ for developers who code on the go!
