Goal

Add secure authentication to your Next.js app using OJJS (NextAuth v5) with Google OAuth, protect CRUD routes, and deploy to Vercel/AWS.

🔵 PHASE 1 — Install & Configure OJJS
1️⃣ Install OJJS

Go to your project root and run:

npm install next-auth@beta


If errors due to React 19 dependencies:

npm install next-auth@beta --legacy-peer-deps

2️⃣ Create an Authentication Secret

This encrypts tokens.

npx auth secret


This will automatically add:

AUTH_SECRET=yourgeneratedsecret


➡️ Later, add this to Vercel/AWS environment variables too.

3️⃣ Add Authentication Files
✔️ Create /auth.ts (or /lib/auth.ts)

This file configures OJJS with Google provider.

Inside /auth.ts:

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.AUTH_SECRET,
});

✔️ Create dynamic API route

Create the folder:

/app/api/auth/[...nextauth]/route.ts


Paste this:

import { handlers } from "@/auth"; 
export const { GET, POST } = handlers;


➡️ This enables /api/auth/* endpoints (signin, signout, callback, session, etc.)

🔵 PHASE 2 — Google Cloud Setup
4️⃣ Create Google Cloud Project

Go to https://console.cloud.google.com

Log in → create a new project (or select My First Project).

5️⃣ Configure OAuth Consent Screen

Go to: APIs & Services → OAuth consent screen

User type: External

App name: personapp

Support email: your Gmail

Developer contact: your Gmail

Save & Continue until Finish

6️⃣ Create OAuth Credentials

Navigate to:
APIs & Services → Credentials → Create Credentials → OAuth Client ID

Application type → Web Application

Name → personapp-local

Redirect URI → add:

http://localhost:3000/api/auth/callback/google


When deploying, add:

https://your-vercel-site.vercel.app/api/auth/callback/google

🎯 Copy your credentials into .env.local
GOOGLE_CLIENT_ID=xxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxx
AUTH_SECRET=xxxxxxxx

🔵 PHASE 3 — Protecting Routes
7️⃣ Setup session access

Inside any server component:

import { auth } from "@/auth";

const session = await auth();
if (!session) redirect("/api/auth/signin");

8️⃣ Protect CRUD API Routes

Example: /app/api/items/route.ts

import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  // CRUD logic...
}

9️⃣ Add login / logout buttons

Example in your navbar:

"use client";
import { signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  return (
    <>
      <button onClick={() => signIn("google")}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}

🔵 PHASE 4 — Deploying
🔟 Deployment to Vercel

Push to GitHub

Import project in Vercel

Add environment variables:

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

AUTH_SECRET

Add production redirect URL:

https://yourproject.vercel.app/api/auth/callback/google

🔵 FINAL CHECKLIST
Step	Status
Install next-auth	✅
Generate secret	✅
Create auth.ts and API route	✅
Google Cloud project	⬜
OAuth consent screen	⬜
Create OAuth client	⬜
Add environment variables	⬜
Protect pages & APIs	⬜
Deploy & update redirect URI