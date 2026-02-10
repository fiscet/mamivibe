import type { HomePage, Review as SanityReview, Service, Page, SiteSettings, FooterSettings, ContactPage, ServicesPage, AboutPage, BookingPage, PortableTextContent, SeoFields } from './sanity.types';

// Custom interfaces for the application

// Service Card
export interface ServiceCard {
  icon?: 'FaHandsHelping' | 'FaBaby' | 'FaCalendarCheck' | 'FaHeart' | 'FaStar' | 'FaGraduationCap' | 'FaShieldAlt' | 'FaUsers' | 'FaLightbulb' | 'FaCheckCircle' | 'FaStethoscope' | 'FaBook' | 'FaChalkboardTeacher' | 'FaClock' | 'FaVideo' | 'FaPhone' | 'FaEnvelope' | 'FaMapMarkerAlt' | 'FaBox' | 'FaAward';
  title?: string;
  description?: string;
  link?: string;
}

// Review (Custom)
export interface Review {
  name: string;
  content: string;
  rating: number;
}

// Sanity Review (with _id)
export interface SanityReviewWithId extends SanityReview {
  _id: string;
}

// Simplified type for home page data based on Sanity schema
export interface HomePageData extends Omit<HomePage, 'servicesOverview'> {
  servicesOverview?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    serviceCards?: ServiceCard[];
  };
}

// Site Settings Data
export interface SiteSettingsData {
  siteName?: string;
  logo?: {
    asset?: { _ref: string; };
    alt?: string;
    _type: 'image';
  };
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  googleAnalyticsId?: string;
}

// Navbar Props
export interface NavbarProps {
  siteSettings?: SiteSettingsData | null;
  hasBlogPosts?: boolean;
  isDraftMode?: boolean;
}

// Nav Item
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; }>;
}

// Footer Data
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
  pinterest?: string;
}

export interface FooterData {
  description?: string;
  socialLinks?: SocialLinks;
}

export interface ContactData {
  contactInfo?: {
    phone?: {
      number?: string;
      hours?: string;
    };
    email?: {
      address?: string;
    };
    location?: {
      street?: string;
      note?: string;
    };
  };
}

// Google Analytics Props
export interface GoogleAnalyticsProps {
  measurementId: string | null | undefined;
}

// Page Data Interfaces
export interface BookingPageData {
  hero?: { title?: string; subtitle?: string; };
  instructions?: PortableTextContent;
  confirmationMessages?: {
    successTitle?: string;
    successMessage?: string;
  };
  seo?: SeoFields;
}

export interface ServicesPageData {
  hero?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
  emptyStateMessage?: string;
  seo?: SeoFields;
}

export interface ContactPageData {
  hero?: { title?: string; subtitle?: string; };
  contactInfo?: {
    phone?: {
      number?: string;
      hours?: string;
    };
    email?: {
      address?: string;
    };
    location?: {
      street?: string;
      note?: string;
    };
  };
  form?: {
    title?: string;
    subtitle?: string;
    responseTimeNote?: string;
    successMessage?: string;
  };
  map?: {
    showMap?: boolean;
    embedUrl?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
  seo?: SeoFields;
}

export interface BlogPost {
  _id: string;
  _type: 'page';
  _createdAt: string;
  _updatedAt: string;
  slug?: { current?: string; };
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  heroImage?: {
    asset?: { _ref: string; };
    alt?: string;
    _type: 'image';
  };
  content?: PortableTextContent;
  seo?: SeoFields;
}

export interface PageProps {
  params: Promise<{ slug: string; }>;
}

// Portable Text Components Types
export interface TableCell {
  _key: string;
  content?: string;
  isHeader?: boolean;
}

export interface TableRow {
  _key: string;
  cells?: TableCell[];
}

export interface TableBlockValue {
  caption?: string;
  rows?: TableRow[];
  hasHeaderRow?: boolean;
  style?: string;
}

export interface CodeBlockValue {
  code?: string;
  language?: string;
  renderAsHtml?: boolean;
  showLineNumbers?: boolean;
}

export interface CalloutBlockValue {
  type?: string;
  title?: string;
  content?: string;
}

export interface DividerBlockValue {
  style?: string;
}

export interface ImageValue {
  asset?: { _ref: string; };
  alt?: string;
  caption?: string;
  size?: string;
  alignment?: string;
  float?: string;
  borderRadius?: string;
  shadow?: boolean;
  border?: boolean;
  link?: string;
  customClass?: string;
  _type: 'image';
}

// Review Form Types
export interface ReviewFormState {
  success: boolean;
  message: string;
}