# Quick Start Guide 🚀

Get CodeBuilder Pro running in 5 minutes!

## Step 1: Install Dependencies

```bash
bun install
```

## Step 2: Run Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Get Your API Keys

### OpenRouter (for AI features)

1. Visit [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up (it's free!)
3. Click "Create Key"
4. Copy your API key (starts with `sk-or-v1-...`)

### GitHub (for deployments)

1. Visit [github.com/settings/tokens/new](https://github.com/settings/tokens/new?scopes=repo)
2. Name it "CodeBuilder Pro"
3. Check the `repo` scope
4. Click "Generate token"
5. Copy your token (starts with `ghp_...`)

## Step 4: Configure in the App

1. Click the Settings icon (⚙️) in the top right
2. Paste your OpenRouter API key
3. Paste your GitHub token
4. Click "Save API Keys"

## Step 5: Start Coding!

### Create a New File

1. Click the `+` icon next to "Files"
2. Enter a filename (e.g., `app.js`)
3. Start coding!

### Use AI Assistant

1. Write some code
2. Open the AI Assistant panel (✨ icon on mobile)
3. Type a prompt like:
   - "Add error handling"
   - "Explain this code"
   - "Convert to TypeScript"
4. Click Send or "Explain Current Code"
5. Click "Apply Code" to use the AI's suggestion

### Deploy to GitHub

1. Click Settings (⚙️)
2. Scroll to "Deploy to GitHub"
3. Enter a repository name
4. Click "Deploy to GitHub"
5. Your code is now on GitHub!

## Mobile Usage

### On Your Phone

1. Open the deployed URL in your mobile browser
2. Add to home screen:
   - **iOS**: Share → Add to Home Screen
   - **Android**: Menu → Add to Home Screen

### Mobile Tips

- Tap ☰ to open/close file explorer
- Tap ✨ to open/close AI assistant
- Use landscape mode for more space
- Works great with external keyboard!

## Common Tasks

### Create a Simple Web App

1. Create `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <h1>Hello World!</h1>
  <script src="app.js"></script>
</body>
</html>
```

2. Create `app.js`:
```javascript
console.log('Hello from CodeBuilder Pro!');
```

3. Deploy to GitHub
4. Enable GitHub Pages in your repo settings
5. Your app is live!

### Use AI to Build Features

1. Create a file with basic structure
2. Ask AI: "Add a todo list with add/delete functionality"
3. Review the code
4. Click "Apply Code"
5. Test and iterate!

### Organize Your Project

```
my-project/
├── src/
│   ├── index.js
│   ├── utils.js
│   └── components/
│       └── Button.js
├── styles/
│   └── main.css
└── README.md
```

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save indicator
- `Ctrl/Cmd + F` - Find in editor
- `Ctrl/Cmd + H` - Find and replace
- `Alt + Up/Down` - Move line up/down
- `Ctrl/Cmd + /` - Toggle comment

## Troubleshooting

### AI Not Responding?

- Check your OpenRouter API key
- Make sure you have a file selected
- Check browser console for errors

### Can't Deploy to GitHub?

- Verify your GitHub token
- Check token has `repo` scope
- Try a different repository name

### Editor Not Loading?

- Refresh the page
- Clear browser cache
- Try a different browser

## Next Steps

- Read the full [README.md](README.md)
- Check out [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- Explore the AI features
- Build something awesome!

## Example Projects to Try

### 1. Personal Website
```javascript
// Create index.html, style.css, and script.js
// Use AI to help design and add features
```

### 2. Todo App
```javascript
// Ask AI: "Create a todo app with localStorage"
// Deploy to GitHub Pages
```

### 3. API Client
```javascript
// Ask AI: "Create a weather app using OpenWeather API"
// Add error handling and UI
```

### 4. Game
```javascript
// Ask AI: "Create a simple snake game with canvas"
// Add scoring and levels
```

## Tips for Best Results

1. **Be Specific**: "Add a function to validate email" works better than "improve this"
2. **Iterate**: Start simple, then ask AI to enhance
3. **Review Code**: Always review AI suggestions before applying
4. **Save Often**: Deploy to GitHub regularly
5. **Use Comments**: Add comments to help AI understand context

## Getting Help

- Check the README for detailed docs
- Review browser console for errors
- Test in different browsers
- Try the AI's "Explain Current Code" feature

---

Happy coding! 🎉

Built something cool? Share it with the community!
