import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/lib/sanity.client';
import { token } from '@/lib/sanity.config';

// Create a wrapper around defineEnableDraftMode to log calls
const original = defineEnableDraftMode({
  client: client.withConfig({ token }),
});

export const GET = async (request: Request) => {
  console.log('Enable draft mode route called');
  console.log('URL:', request.url);
  console.log('Headers:', Object.fromEntries(request.headers.entries()));

  return original.GET(request);
};
