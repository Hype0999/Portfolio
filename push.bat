@echo off
echo ===================================================
echo   The Monsoon Labs - Auto GitHub Deployer
echo ===================================================
echo.

echo [1/5] Initializing Git repository...
git init
echo.

echo [2/5] Adding all files...
git add .
echo.

echo [3/5] Committing files...
git commit -m "Initial commit: Complete Monsoon Labs portfolio with premium UI"
echo.

echo [4/5] Setting branch to main...
git branch -M main
echo.

echo ===================================================
set /p repo="[5/5] Paste your GitHub Repository URL and hit Enter: "
echo ===================================================
echo.

git remote add origin %repo%
echo Pushing code to GitHub...
git push -u origin main
echo.

echo ===================================================
echo   Deployment Complete! 
echo   Check your GitHub Actions tab to see it go live.
echo ===================================================
pause
