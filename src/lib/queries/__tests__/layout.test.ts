import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSiteSettings, getBlogPostCount } from '../layout';
import { sanityFetch } from '@/lib/sanity.client';
import type { SiteSettingsData } from '@/types/custom.types';

// Mock the sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

describe('getSiteSettings', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns site settings when fetch succeeds', async () => {
    const mockData: SiteSettingsData = {
      siteName: 'Mamivibe',
      logo: {
        asset: { _ref: 'image-abc123' },
        alt: 'Logo',
        _type: 'image',
      },
      logoWidth: 200,
      logoHeight: 60,
      googleAnalyticsId: 'GA-123',
    };

    mockSanityFetch.mockResolvedValueOnce(mockData);

    const result = await getSiteSettings();

    expect(result).toEqual(mockData);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['siteSettings'],
    });
  });

  it('returns null when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getSiteSettings();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching site settings:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

describe('getBlogPostCount', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns blog post count when fetch succeeds', async () => {
    mockSanityFetch.mockResolvedValueOnce(5);

    const result = await getBlogPostCount();

    expect(result).toBe(5);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['blog'],
    });
  });

  it('returns 0 when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getBlogPostCount();

    expect(result).toBe(0);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching blog post count:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});