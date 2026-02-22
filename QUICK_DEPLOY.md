# 🚀 Quick Deploy Guide

## Fastest Way to Deploy (5 Minutes)

### Step 1: Push to GitHub

```powershell
# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit - CGPA Calculator"

# Create a repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cgpa-calculator.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. Go to **[render.com](https://render.com)** → Sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub and select your repository
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **"Create Web Service"**
6. **Copy your backend URL** (e.g., `https://cgpa-api.onrender.com`)

### Step 3: Update Frontend with Backend URL

Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://YOUR-BACKEND-URL.onrender.com';
```

**OR** create `frontend/.env.production`:
```
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
```

Commit changes:
```powershell
git add .
git commit -m "Update API URL for production"
git push
```

### Step 4: Deploy Frontend on Vercel

1. Go to **[vercel.com](https://vercel.com)** → Sign up (free)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - (Or leave empty - Vercel auto-detects Vite)
5. If using .env.production, add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com`
6. Click **"Deploy"**

### Step 5: Update CORS in Backend

Once frontend is deployed, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://YOUR-FRONTEND-URL.vercel.app"  # Add this
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push - Render will auto-deploy:
```powershell
git add .
git commit -m "Update CORS for production"
git push
```

### 🎉 Done!

Your app is now live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-api.onrender.com`

---

## Alternative: All on Render (Even Simpler!)

Deploy both frontend and backend on Render:

**Backend:**
- Same as Step 2 above

**Frontend:**
1. Render → **"New +"** → **"Static Site"**
2. Select your repository
3. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Environment Variables:
   - `VITE_API_URL`: `https://your-backend.onrender.com`
5. Deploy!

---

## ⚡ Pro Tips

1. **Free Tier Cold Starts:** Render free tier sleeps after 15 min inactivity
   - First request may be slow (20-30 seconds)
   - Use [UptimeRobot](https://uptimerobot.com/) to ping every 5 min

2. **Auto Deploy:** Both Render and Vercel auto-deploy on git push

3. **Custom Domain:** Add in platform settings (usually free)

4. **Logs:** Check platform dashboards if something breaks

---

## 🆘 Troubleshooting

**Frontend can't connect to backend?**
- Check API URL in browser console
- Verify backend URL is correct
- Check CORS settings in backend

**Backend not starting?**
- Check logs in Render dashboard
- Verify requirements.txt has all dependencies
- Check Python version (3.8+)

**Build fails?**
- Check build logs
- Verify all dependencies are listed
- Test build locally first: `npm run build`

---

For detailed guides, see [DEPLOYMENT.md](DEPLOYMENT.md)
