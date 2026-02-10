import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getApprovedReviews, getAverageRating, getReviews } from '../reviews';
import { sanityFetch } from '@/lib/sanity.client';
import type { SanityReviewWithId } from '@/types/custom.types';

// Mock the sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn(),
}));

const mockSanityFetch = vi.mocked(sanityFetch);

describe('getApprovedReviews', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns approved reviews when fetch succeeds', async () => {
    const mockReviews: SanityReviewWithId[] = [
      {
        _id: 'review1',
        _type: 'review',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'abc123',
        name: 'John Doe',
        content: 'Great service!',
        rating: 5,
        reviewDate: '2024-01-01',
      },
    ];

    mockSanityFetch.mockResolvedValueOnce(mockReviews);

    const result = await getApprovedReviews();

    expect(result).toEqual(mockReviews);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['reviews'],
    });
  });

  it('returns empty array when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getApprovedReviews();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching reviews:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

describe('getAverageRating', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns average rating when fetch succeeds', async () => {
    mockSanityFetch.mockResolvedValueOnce({ count: 10, total: 45 });

    const result = await getAverageRating();

    expect(result).toEqual({ count: 10, average: 4.5 });
  });

  it('returns zero average when no reviews', async () => {
    mockSanityFetch.mockResolvedValueOnce({ count: 0, total: 0 });

    const result = await getAverageRating();

    expect(result).toEqual({ count: 0, average: 0 });
  });

  it('returns zero values when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getAverageRating();

    expect(result).toEqual({ count: 0, average: 0 });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching average rating:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

describe('getReviews', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns reviews with default maxCount of 3', async () => {
    const mockReviews: SanityReviewWithId[] = [
      {
        _id: 'review1',
        _type: 'review',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'abc123',
        name: 'John Doe',
        content: 'Great service!',
        rating: 5,
        reviewDate: '2024-01-01',
      },
    ];

    mockSanityFetch.mockResolvedValueOnce(mockReviews);

    const result = await getReviews({ maxCount: 3 });

    expect(result).toEqual(mockReviews);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('[0...3]'),
      tags: ['reviews'],
    });
  });

  it('returns reviews with custom maxCount', async () => {
    const mockReviews: SanityReviewWithId[] = [];
    mockSanityFetch.mockResolvedValueOnce(mockReviews);

    await getReviews({ maxCount: 5 });

    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('[0...5]'),
      tags: ['reviews'],
    });
  });

  it('returns empty array when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getReviews({ maxCount: 3 });

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching reviews:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});