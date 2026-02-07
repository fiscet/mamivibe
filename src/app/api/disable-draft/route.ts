import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const redirectTo = searchParams.get('redirect') || '/';

  // Disable draft mode
  const draft = await draftMode();
  draft.disable();

  // Build the redirect URL
  const redirectUrl = new URL(redirectTo, origin);

  // Return a redirect response with the cookie cleared
  return NextResponse.redirect(redirectUrl, {
    status: 307,
  });
}
