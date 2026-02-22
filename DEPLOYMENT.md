# 🚀 Deployment Guide - CGPA Calculator

This guide covers multiple hosting options for deploying your CGPA Calculator application.

## 📋 Table of Contents
1. [Quick Deploy (Recommended for Students)](#quick-deploy)
2. [Backend Deployment Options](#backend-deployment)
3. [Frontend Deployment Options](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Setup](#custom-domain)

---

## 🎯 Quick Deploy (Recommended for Students)

### Option 1: Render (Free Tier) ⭐ RECOMMENDED

**Best for:** Complete free hosting with both frontend and backend

#### Backend on Render

1. **Push code to GitHub**
   ```powershell
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cgpa-backend.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** cgpa-calculator-api
     - **Runtime:** Python 3
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Instance Type:** Free
   - Click "Create Web Service"
   - Note your backend URL: `https://cgpa-calculator-api.onrender.com`

#### Frontend on Render

1. **Update API URL in frontend**
   - Edit `frontend/src/services/api.js`
   - Change `API_BASE_URL` to your Render backend URL

2. **Push frontend to GitHub**
   ```powershell
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cgpa-frontend.git
   git push -u origin main
   ```

3. **Deploy on Render**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name:** cgpa-calculator
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - Click "Create Static Site"
   - Your app will be live at: `https://cgpa-calculator.onrender.com`

---

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Backend on Railway

1. **Deploy Backend**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your backend repository
   - Add `Procfile` in backend directory:
     ```
     web: uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - Railway will auto-detect Python and deploy
   - Note your backend URL

#### Frontend on Vercel

1. **Update API URL**
   - Edit `frontend/src/services/api.js` with Railway backend URL

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your frontend GitHub repository
   - Vercel auto-detects Vite and deploys
   - Your app is live at: `https://your-app.vercel.app`

---

### Option 3: Netlify (Frontend) + Render (Backend)

#### Backend on Render
- Follow "Backend on Render" steps above

#### Frontend on Netlify

1. **Update API URL** with Render backend URL

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your frontend repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy"
   - Your app is live at: `https://your-app.netlify.app`

---

## 🔧 Backend Deployment Options

### A. Render (Free) ⭐

**Pros:** Free tier, auto-deploy, SSL included  
**Cons:** Spins down after inactivity (cold starts)

See Quick Deploy section above.

### B. Railway (Free $5 credit/month)

**Pros:** Fast, modern, good for students  
**Cons:** Limited free tier

```powershell
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
cd backend
railway init
railway up
```

### C. PythonAnywhere (Free Tier)

**Pros:** Python-focused, good for beginners  
**Cons:** Manual setup required

1. Sign up at [pythonanywhere.com](https://pythonanywhere.com)
2. Open Bash console
3. Clone your repository
4. Set up virtual environment
5. Configure WSGI file for FastAPI

### D. Heroku (Paid after Nov 2022)

```powershell
# Create Procfile
echo "web: uvicorn main:app --host 0.0.0.0 --port $PORT" > Procfile

# Deploy
heroku login
heroku create cgpa-calculator-api
git push heroku main
```

---

## 🎨 Frontend Deployment Options

### A. Vercel (Free) ⭐

**Pros:** Free, fast CDN, auto-deploy, perfect for React  
**Cons:** None for this use case

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### B. Netlify (Free)

**Pros:** Free, drag-and-drop, form handling  
**Cons:** None

- Drag `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
- Or use CLI:
```powershell
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### C. GitHub Pages (Free)

**Pros:** Free, integrated with GitHub  
**Cons:** Static only, requires gh-pages branch

```powershell
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### D. Firebase Hosting (Free)

```powershell
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🔐 Environment Variables

### Backend Environment Variables

Create in your hosting platform:

```
PORT=8000
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables

Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend.onrender.com';
```

Create `.env.production` in frontend:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 📝 Deployment Checklist

### Before Deploying Backend:

- [ ] Add all dependencies to `requirements.txt`
- [ ] Configure CORS with frontend URL
- [ ] Test API endpoints locally
- [ ] Add Procfile or start command
- [ ] Set environment variables
- [ ] Test with production URL

### Before Deploying Frontend:

- [ ] Update API base URL to production backend
- [ ] Build and test locally: `npm run build && npm run preview`
- [ ] Check responsive design
- [ ] Test all features
- [ ] Verify API calls work
- [ ] Set up environment variables

---

## 🌐 Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

### For Render:
1. Go to Settings → Custom Domains
2. Add domain and configure DNS

---

## 🐛 Common Issues & Solutions

### CORS Errors
**Problem:** Frontend can't connect to backend  
**Solution:** Update CORS origins in backend `main.py`:
```python
allow_origins=["https://your-frontend-url.vercel.app"]
```

### Cold Starts on Free Tier
**Problem:** First request is slow  
**Solution:** 
- Use a service like UptimeRobot to ping your backend every 5 mins
- Or upgrade to paid tier

### Build Failures
**Problem:** Deployment build fails  
**Solution:** 
- Check Node version matches local
- Verify all dependencies in package.json
- Check build logs for specific errors

### API URL Not Found
**Problem:** Frontend can't find backend  
**Solution:**
- Verify backend URL is correct in api.js
- Check backend is running
- Test backend URL directly in browser

---

## 💡 Recommended Stack for Students

**Best Free Option:**
- **Backend:** Render (Free tier)
- **Frontend:** Vercel (Free tier)
- **Database:** (Not needed for this app)

**Total Cost:** $0/month

**Why?**
- ✅ Both have generous free tiers
- ✅ Auto-deploy from GitHub
- ✅ Free SSL certificates
- ✅ Easy to set up
- ✅ Good performance
- ✅ Professional URLs

---

## 📊 Hosting Comparison

| Platform | Backend | Frontend | Free Tier | Ease |
|----------|---------|----------|-----------|------|
| Render | ✅ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Vercel | ⚠️ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Netlify | ❌ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Railway | ✅ | ✅ | Limited | ⭐⭐⭐⭐ |
| Heroku | ✅ | ❌ | ❌ | ⭐⭐⭐ |
| PythonAnywhere | ✅ | ❌ | ✅ | ⭐⭐⭐ |

---

## 🎓 Final Notes

1. **Start Simple:** Use Render for both frontend and backend
2. **Version Control:** Always use Git and GitHub
3. **Environment Variables:** Never commit secrets
4. **Test Locally First:** Always test before deploying
5. **Monitor:** Check logs if something breaks
6. **Free Tier Limits:** Be aware of usage limits

---

## 📞 Need Help?

Common hosting platform documentation:
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)

---

**Happy Deploying! 🚀**
