# Google OAuth Setup Guide

Follow these steps to create your OAuth credentials:

## Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click on the project dropdown (top-left, next to "Google Cloud")
3. Click **"NEW PROJECT"**
4. **Project name:** `person-search-app`
5. **Organization:** (leave empty if you don't have one)
6. Click **"CREATE"**
7. Wait for the project to be created and selected

## Step 2: Enable Google+ API

1. In the top search bar, search for `Google+ API`
2. Click on **"Google+ API"** from results
3. Click the **"ENABLE"** button
4. Wait for it to finish enabling

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen** (left sidebar)
2. Select **External** as User Type
3. Click **"CREATE"**

**Fill the form:**
- **App name:** `Person Search App`
- **User support email:** (your Gmail address)
- **Developer contact information:** (your Gmail address)

4. Click **"SAVE AND CONTINUE"**
5. Click **"SAVE AND CONTINUE"** again (skip scopes)
6. Click **"SAVE AND CONTINUE"** again (skip test users)
7. Click **"BACK TO DASHBOARD"**

## Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials** (left sidebar)
2. Click **"+ CREATE CREDENTIALS"** (top button)
3. Select **"OAuth client ID"**
4. If prompted, click **"CONFIGURE CONSENT SCREEN"** and complete Step 3 first

**Application type:** Select **"Web application"**

**Name:** `person-search-oauth`

**Authorized JavaScript origins:**
- Click **"+ ADD URI"**
- Add: `http://localhost:3000`

**Authorized redirect URIs:**
- Click **"+ ADD URI"**
- Add: `http://localhost:3000/api/auth/callback/google`

5. Click **"CREATE"**

## Step 5: Copy Your Credentials

A popup will show your credentials:
- Copy **Client ID**
- Copy **Client Secret**

## Step 6: Update .env.local

Open `.env.local` in your project and update:

```
GOOGLE_CLIENT_ID=<paste your Client ID here>
GOOGLE_CLIENT_SECRET=<paste your Client Secret here>
```

**Example:**
```
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456
```

## Step 7: Add Production Redirect URI (Later)

When deploying to Vercel, come back to the OAuth credentials and add:

**Authorized redirect URIs (add another):**
- `https://your-vercel-domain.vercel.app/api/auth/callback/google`

---

## Testing Locally

After updating `.env.local`:

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click the **"Sign In"** button
4. You should be able to sign in with your Google account!

---

## Troubleshooting

**"Redirect URI mismatch" error:**
- Make sure the redirect URI in your `.env.local` matches exactly what's in Google Console
- Default should be: `http://localhost:3000/api/auth/callback/google`

**App showing "This app isn't verified":**
- This is normal during development
- Click **"Continue"** to proceed

