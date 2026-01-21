import { defineField, defineType } from 'sanity';
import { FaTags } from 'react-icons/fa';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: FaTags,
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
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Small badge below subtitle (e.g., "💻 Online konzultáció • 🏠 Személyes tanácsadás")',
        }),
      ],
    }),

    // Content Section
    defineField({
      name: 'emptyStateMessage',
      title: 'Empty State Message',
      type: 'string',
      group: 'content',
      description: 'Message to show when no services are available',
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
        title: 'Services Page',
        subtitle: 'Services listing page',
      };
    },
  },
});
