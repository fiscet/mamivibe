import { defineField, defineType } from 'sanity';
import { FaCalendarAlt } from 'react-icons/fa';

export const bookingPage = defineType({
  name: 'bookingPage',
  title: 'Booking Page',
  type: 'document',
  icon: FaCalendarAlt,
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    // Additional Instructions
    defineField({
      name: 'instructions',
      title: 'Additional Instructions',
      type: 'portableTextContent',
      group: 'content',
      description: 'Optional additional instructions or information for booking',
    }),

    // Confirmation Messages
    defineField({
      name: 'confirmationMessages',
      title: 'Confirmation Messages',
      type: 'object',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'successTitle',
          title: 'Success Title',
          type: 'string',
          description: 'Title shown after successful booking',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 3,
          description: 'Message shown after successful booking',
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Booking Page',
        subtitle: 'Appointment booking page',
      };
    },
  },
});
