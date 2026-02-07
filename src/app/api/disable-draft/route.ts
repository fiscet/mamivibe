import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirect') || '/';

  // Disable draft mode
  const draft = await draftMode();
  draft.disable();

  // Redirect to the specified page or home
  redirect(redirectTo);
}
