// Document types
import { appointment } from './appointment';
import { contactMessage } from './contactMessage';
import { page } from './page';
import { review } from './review';
import { slot } from './slot';
import { service } from './service';

// Singleton page types
import { homePage } from './singletons/homePage';
import { aboutPage } from './singletons/aboutPage';
import { servicesPage } from './singletons/servicesPage';
import { bookingPage } from './singletons/bookingPage';
import { contactPage } from './singletons/contactPage';

// Reusable object types
import { seoFields } from './objects/seoFields';
import { ctaBlock } from './objects/ctaBlock';
import { valueCard } from './objects/valueCard';
import { portableTextContent } from './objects/portableTextContent';

export const schemaTypes = [
  // Object types (must be registered first)
  seoFields,
  ctaBlock,
  valueCard,
  portableTextContent,

  // Singleton pages
  homePage,
  aboutPage,
  servicesPage,
  bookingPage,
  contactPage,

  // Collection document types
  page, // Keep for blog/news if needed
  service,
  appointment,
  contactMessage,
  review,
  slot,
];

// Export singleton document IDs for use in structure
export const singletonTypes = ['homePage', 'aboutPage', 'servicesPage', 'bookingPage', 'contactPage'];
