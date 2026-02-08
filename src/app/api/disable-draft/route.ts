import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const redirectTo = searchParams.get('redirect') || '/';

  console.log('Disable draft mode route called');
  console.log('URL:', request.url);
  console.log('Headers:', Object.fromEntries(request.headers.entries()));

  const draft = await draftMode();
  draft.disable();

  const redirectUrl = new URL(redirectTo, origin);

  return NextResponse.redirect(redirectUrl);
}
