import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBlogPosts, getBlogPost, getAllBlogSlugs } from '../blog';
import { sanityFetch, client } from '@/lib/sanity.client';
import type { BlogPost } from '@/types/custom.types';

// Mock the sanity client
vi.mock('@/lib/sanity.client', () => ({
  sanityFetch: vi.fn(),
  client: {
    fetch: vi.fn(),
  },
}));

const mockSanityFetch = vi.mocked(sanityFetch);
const mockClientFetch = vi.mocked(client.fetch);

describe('getBlogPosts', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns blog posts when fetch succeeds', async () => {
    const mockPosts: BlogPost[] = [
      {
        _id: 'post1',
        _type: 'page',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        title: 'Test Post',
        slug: { current: 'test-post' },
        excerpt: 'Test excerpt',
        publishedAt: '2024-01-01',
      },
    ];

    mockSanityFetch.mockResolvedValueOnce(mockPosts);

    const result = await getBlogPosts();

    expect(result).toEqual(mockPosts);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      tags: ['blog'],
    });
  });

  it('returns empty array when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getBlogPosts();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching blog posts:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

describe('getBlogPost', () => {
  beforeEach(() => {
    mockSanityFetch.mockClear();
  });

  it('returns blog post by slug when fetch succeeds', async () => {
    const mockPost: BlogPost = {
      _id: 'post1',
      _type: 'page',
      _createdAt: '2024-01-01T00:00:00Z',
      _updatedAt: '2024-01-01T00:00:00Z',
      title: 'Test Post',
      slug: { current: 'test-post' },
      excerpt: 'Test excerpt',
      publishedAt: '2024-01-01',
    };

    mockSanityFetch.mockResolvedValueOnce(mockPost);

    const result = await getBlogPost('test-post');

    expect(result).toEqual(mockPost);
    expect(mockSanityFetch).toHaveBeenCalledWith({
      query: expect.any(String),
      params: { slug: 'test-post' },
      tags: ['blog', 'blog-test-post'],
    });
  });

  it('returns null when post not found', async () => {
    mockSanityFetch.mockResolvedValueOnce(null);

    const result = await getBlogPost('non-existent');

    expect(result).toBeNull();
  });

  it('returns null when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockSanityFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getBlogPost('test-post');

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching blog post with slug "test-post":',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});

describe('getAllBlogSlugs', () => {
  beforeEach(() => {
    mockClientFetch.mockClear();
  });

  it('returns all blog slugs when fetch succeeds', async () => {
    const mockSlugs = [{ slug: 'post-1' }, { slug: 'post-2' }];
    mockClientFetch.mockResolvedValueOnce(mockSlugs as unknown as never);

    const result = await getAllBlogSlugs();

    expect(result).toEqual(mockSlugs);
    expect(mockClientFetch).toHaveBeenCalledWith(expect.any(String));
  });

  it('returns empty array when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    mockClientFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getAllBlogSlugs();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching blog slugs:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});