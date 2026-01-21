import { defineField, defineType } from 'sanity';
import { FaEnvelope } from 'react-icons/fa';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: FaEnvelope,
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'form', title: 'Form Settings' },
    { name: 'map', title: 'Map' },
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

    // Contact Information
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Phone Number',
              type: 'string',
              description: 'e.g., +36 30 123 4567',
            }),
            defineField({
              name: 'hours',
              title: 'Available Hours',
              type: 'string',
              description: 'e.g., Hétköznap 9:00 - 17:00',
            }),
          ],
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'object',
          fields: [
            defineField({
              name: 'address',
              title: 'Email Address',
              type: 'string',
              description: 'e.g., info@mamivibe.hu',
            }),
          ],
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Street Address',
              type: 'string',
              description: 'e.g., 1111 Budapest, Példa utca 12.',
            }),
            defineField({
              name: 'note',
              title: 'Location Note',
              type: 'string',
              description: 'e.g., Személyes és online konzultáció is elérhető',
            }),
          ],
        }),
      ],
    }),

    // Form Settings
    defineField({
      name: 'form',
      title: 'Form Settings',
      type: 'object',
      group: 'form',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Form Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'responseTimeNote',
          title: 'Response Time Note',
          type: 'string',
          description: 'e.g., Írj nekem, és igyekszem 24 órán belül válaszolni.',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 2,
          description: 'Message shown after successful form submission',
        }),
      ],
    }),

    // Map Settings
    defineField({
      name: 'map',
      title: 'Map Settings',
      type: 'object',
      group: 'map',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'showMap',
          title: 'Show Map',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'embedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          description: 'Paste the Google Maps embed URL here',
        }),
        defineField({
          name: 'coordinates',
          title: 'Coordinates',
          type: 'object',
          description: 'Alternative: provide coordinates for custom map',
          fields: [
            defineField({ name: 'lat', title: 'Latitude', type: 'number' }),
            defineField({ name: 'lng', title: 'Longitude', type: 'number' }),
          ],
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
        title: 'Contact Page',
        subtitle: 'Contact information page',
      };
    },
  },
});
