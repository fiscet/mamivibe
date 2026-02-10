import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getContactPageData } from '../contact';
import { sanityFetch } from '@/lib/sanity.client';
import type { ContactPageData } from '@/types/custom.types';

// Mock the sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

describe('getContactPageData', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns contact page data when fetch succeeds', async () => {
    const mockData: ContactPageData = {
      hero: {
        title: 'Contact Us',
        subtitle: 'Get in touch',
      },
      contactInfo: {
        phone: {
          number: '+36 30 385 2881',
          hours: 'Mon-Fri 9-17',
        },
        email: {
          address: 'info@mamivibe.hu',
        },
        location: {
          street: 'Göcseji út 4-6.',
          note: 'Zalaegerszeg',
        },
      },
      form: {
        title: 'Send us a message',
        subtitle: 'We will respond within 24 hours',
        responseTimeNote: 'Usually within 2 hours',
        successMessage: 'Thank you for your message!',
      },
      map: {
        showMap: true,
        embedUrl: 'https://maps.google.com/embed',
      },
    };

    mockSanityFetch.mockResolvedValueOnce(mockData);

    const result = await getContactPageData();

    expect(result).toEqual(mockData);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['contactPage'],
    });
  });

  it('returns null when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getContactPageData();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching contact page data:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});