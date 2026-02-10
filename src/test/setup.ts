import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock next/headers
vi.mock('next/headers', () => ({
  draftMode: vi.fn(() => ({
    isEnabled: false,
  })),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

// Mock server-only
vi.mock('server-only', () => ({}));