import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAboutPage } from '../about';
import { sanityFetch } from '@/lib/sanity.client';
import type { AboutPage } from '@/types/sanity.types';

// Mock the sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

describe('getAboutPage', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns about page data when fetch succeeds', async () => {
    const mockData: AboutPage = {
      _id: 'aboutPage',
      _type: 'aboutPage',
      _createdAt: '2024-01-01T00:00:00Z',
      _updatedAt: '2024-01-01T00:00:00Z',
      _rev: 'abc123',
      hero: {
        title: 'About Us',
        subtitle: 'Our story',
      },
    };

    mockSanityFetch.mockResolvedValueOnce(mockData);

    const result = await getAboutPage();

    expect(result).toEqual(mockData);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['aboutPage'],
    });
  });

  it('returns null when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getAboutPage();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching about page:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});