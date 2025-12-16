# 🚀 Deployment Guide

## Deploy to GitHub Pages

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Developer Type Assessment"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `developertype`
3. **DO NOT** initialize with README (we already have one)

### 3. Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/developertype.git
git push -u origin main
```

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
- Build the production version (`npm run build`)
- Push the `dist` folder to the `gh-pages` branch
- Your site will be live at `https://YOUR_USERNAME.github.io/developertype/`

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Source should already be set to `gh-pages` branch
4. Wait 1-2 minutes for deployment
5. Visit `https://YOUR_USERNAME.github.io/developertype/`

## Update Deployment

Every time you want to deploy changes:

```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

## Custom Domain (Optional)

1. Add a file named `CNAME` to the `public` folder with your domain:
   ```
   developertype.yourdomain.com
   ```

2. Add DNS records:
   - Type: `CNAME`
   - Name: `developertype` (or `@` for root domain)
   - Value: `YOUR_USERNAME.github.io`

3. In GitHub Settings → Pages, add your custom domain

## Troubleshooting

### Blank page after deployment
- Make sure `base: '/developertype/'` in `vite.config.js` matches your repo name
- Clear browser cache

### 404 on refresh
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html` (or use hash routing)

### Build fails
- Run `npm run build` locally first to check for errors
- Make sure all dependencies are in `package.json`
