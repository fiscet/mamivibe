import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getHomePage } from '../home';
import { sanityFetch } from '@/lib/sanity.client';
import type { HomePageData } from '@/types/custom.types';

// Mock the sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

describe('getHomePage', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns home page data when fetch succeeds', async () => {
    const mockData: HomePageData = {
      _id: 'homePage',
      _type: 'homePage',
      _createdAt: '2024-01-01T00:00:00Z',
      _updatedAt: '2024-01-01T00:00:00Z',
      _rev: 'abc123',
      hero: {
        title: 'Welcome',
        subtitle: 'To our site',
      },
    };

    mockSanityFetch.mockResolvedValueOnce(mockData);

    const result = await getHomePage();

    expect(result).toEqual(mockData);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['homePage'],
    });
  });

  it('returns null when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getHomePage();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching home page:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

