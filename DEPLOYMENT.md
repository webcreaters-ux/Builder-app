# Deployment Guide 🚀

This guide will help you deploy CodeBuilder Pro to various platforms and use it on your mobile device.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/codebuilder-pro.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Done! Your app will be live in ~2 minutes

### Option 2: Netlify

1. Push your code to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Option 3: Railway

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Next.js and deploy

## Mobile Access

### Using on Your Phone

Once deployed, you can access your app from any mobile device:

1. **Save to Home Screen** (iOS):
   - Open the deployed URL in Safari
   - Tap the Share button
   - Tap "Add to Home Screen"
   - Now it works like a native app!

2. **Save to Home Screen** (Android):
   - Open the deployed URL in Chrome
   - Tap the menu (⋮)
   - Tap "Add to Home Screen"
   - Access it like any other app!

### Mobile Tips

- Use landscape mode for more screen space
- The file explorer and AI assistant slide in/out on mobile
- All features work on mobile, including GitHub deployment
- Use an external keyboard for faster coding

## Setting Up API Keys on Mobile

### OpenRouter API Key

1. On your phone, visit [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up (free)
3. Create an API key
4. Copy it
5. Open CodeBuilder Pro
6. Tap Settings (⚙️)
7. Paste your API key
8. Tap "Save API Keys"

### GitHub Token

1. On your phone, visit [github.com/settings/tokens/new](https://github.com/settings/tokens/new?scopes=repo)
2. Name it "CodeBuilder Pro Mobile"
3. Select the `repo` scope
4. Generate token
5. Copy it immediately (you won't see it again!)
6. Open CodeBuilder Pro
7. Tap Settings (⚙️)
8. Paste your GitHub token
9. Tap "Save API Keys"

## Environment Variables (Optional)

If you want to pre-configure API keys for your deployment:

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_key_here
   NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
   ```
4. Redeploy

### Netlify

1. Go to Site settings → Environment variables
2. Add the same variables as above
3. Redeploy

## Custom Domain

### Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

### Netlify

1. Go to Domain settings
2. Add custom domain
3. Configure DNS

## GitHub Pages (Static Export)

If you want to host on GitHub Pages:

1. Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   };
   ```

2. Build:
   ```bash
   bun run build
   ```

3. Deploy the `out` folder to GitHub Pages

**Note**: Some features like API routes won't work with static export.

## Self-Hosting

### Using Docker

1. Create `Dockerfile`:
   ```dockerfile
   FROM oven/bun:1 as base
   WORKDIR /app
   
   COPY package.json bun.lock ./
   RUN bun install --frozen-lockfile
   
   COPY . .
   RUN bun run build
   
   EXPOSE 3000
   CMD ["bun", "start"]
   ```

2. Build and run:
   ```bash
   docker build -t codebuilder-pro .
   docker run -p 3000:3000 codebuilder-pro
   ```

### Using PM2

1. Install PM2:
   ```bash
   npm install -g pm2
   ```

2. Build the app:
   ```bash
   bun run build
   ```

3. Start with PM2:
   ```bash
   pm2 start "bun start" --name codebuilder-pro
   pm2 save
   pm2 startup
   ```

## Troubleshooting

### Build Fails

- Make sure you're using Node.js 20+
- Try `bun install` again
- Check for TypeScript errors: `bun typecheck`

### Can't Access on Mobile

- Make sure your deployment is using HTTPS
- Check if your firewall is blocking the port
- Try a different browser

### API Keys Not Working

- Make sure you saved them in Settings
- Check if the keys are valid
- Try regenerating the keys

### GitHub Deployment Fails

- Verify your token has `repo` scope
- Check if the repository name is valid
- Make sure you're authenticated

## Performance Tips

### For Mobile

- Enable dark mode to save battery
- Close unused panels (file explorer, AI assistant)
- Use WiFi for deployments (faster than cellular)

### For Production

- Enable caching in your deployment platform
- Use a CDN for static assets
- Monitor with Vercel Analytics or similar

## Security Best Practices

1. **Never commit API keys** to your repository
2. **Use environment variables** for sensitive data
3. **Rotate tokens** regularly
4. **Use HTTPS** always
5. **Keep dependencies updated**: `bun update`

## Monitoring

### Vercel Analytics

1. Go to your project
2. Enable Analytics
3. View real-time usage data

### Custom Monitoring

Add to your app:
```typescript
// Track errors
window.addEventListener('error', (e) => {
  // Send to your monitoring service
  console.error('Error:', e);
});
```

## Backup Your Work

Always keep backups:

1. **Deploy to GitHub** regularly
2. **Export your files** from the editor
3. **Use version control** for important projects

## Support

If you run into issues:

1. Check the [README.md](README.md)
2. Review browser console for errors
3. Check deployment logs
4. Open an issue on GitHub

---

Happy coding on the go! 🚀📱
