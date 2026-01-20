# Mamivibe

Web application for a lactation consultant with booking, payments, and admin management.

## Tech Stack
- **Framework**: Next.js 16
- **Styling**: TailwindCSS, Shadcn UI
- **Backend/CMS**: Sanity.io
- **Deployment**: Vercel (Frontend), Sanity Studio (Backend)

## Deployment Instructions

### Sanity.io (Backend)
1.  **Login to Sanity**:
    Run `npx sanity login` to authenticate.
2.  **Initialize/Deploy**:
    - If this is a new project, the studio is located in the `/sanity` folder (or root depending on setup).
    - Navigate to the studio folder: `cd sanity`
    - Run `npx sanity deploy` to build and deploy the Studio to a hosted URL (e.g., `https://mamivibe.sanity.studio`).
3.  **CORS Origins**:
    - Go to [sanity.io/manage](https://www.sanity.io/manage).
    - Select your project.
    - Go to **API** > **CORS Origins**.
    - Add your Vercel deployment URL (and `http://localhost:3000` for development) to allow the frontend to fetch data.

### Vercel (Frontend)
1.  **Push to GitHub**:
    Ensure your code is pushed to a git repository.
2.  **Import in Vercel**:
    - Go to [vercel.com/new](https://vercel.com/new).
    - Select your repository.
3.  **Environment Variables**:
    Add the following environment variables in the Vercel project settings:
    - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity Project ID
    - `NEXT_PUBLIC_SANITY_DATASET`: `production`
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe Public Key
    - `STRIPE_SECRET_KEY`: Your Stripe Secret Key
    - `RESEND_API_KEY`: Your Resend API Key
4.  **Deploy**:
    Click **Deploy**. Vercel will build the Next.js app.

## Development
run `npm run dev` to start the frontend.
