# 🚀 Deploying to GitHub Pages (Free Hosting)

I have created an **automatic deployer** for your website using **GitHub Actions**. This means you do **not** need to build the project locally or upload files manually. Every time you push a change to GitHub, your site will automatically build and update.

Follow these simple steps to set it up:

---

### Step 1: Push your code to GitHub
Create a repository on GitHub (if you haven't already), and push your project to the `main` or `master` branch.
```bash
git init
git add .
git commit -m "Initial commit with auto-deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

### Step 2: Enable GitHub Actions Deployment in Settings
Once your code is pushed to GitHub:
1. Open your repository on **GitHub.com**.
2. Click on the **Settings** tab (the gear icon at the top).
3. In the left-hand sidebar, click on **Pages** (under the "Code and automation" section).
4. Look for the **Build and deployment** section.
5. Under **Source**, click the dropdown (which defaults to "Deploy from a branch") and change it to **GitHub Actions**.

---

### Step 3: Watch it deploy automatically!
1. Go to the **Actions** tab at the top of your GitHub repository page.
2. You will see a workflow run called **"Deploy static content to Pages"** automatically running.
3. Once the workflow turns green (completed), click on it to see the link to your live portfolio website!
4. The URL will typically be: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

### Custom Domains (Optional)
If you purchase a custom domain later (like `yourname.com`), you can add it in the same **Pages** settings menu on GitHub, and update the `base` property in `vite.config.js` to `'/'` instead of `'./'`.
