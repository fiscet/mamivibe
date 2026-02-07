import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  // Get the path to redirect to (from Sanity Presentation Tool)
  const redirectTo = searchParams.get('sanity-preview-pathname') || '/';

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the page being previewed
  redirect(`${origin}${redirectTo}`);
}
