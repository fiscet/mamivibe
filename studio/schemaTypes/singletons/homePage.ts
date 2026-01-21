import { defineField, defineType } from 'sanity';
import { FaHome } from 'react-icons/fa';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: FaHome,
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'intro', title: 'Introduction' },
    { name: 'services', title: 'Services Overview' },
    { name: 'testimonials', title: 'Testimonials' },
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
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Small text above the title (e.g., "Szeretetteljes támogatás az anyaság útján")',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Main headline',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Text to highlight with gradient (appears after title)',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          description: 'Supporting text below the title',
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'primaryCTA',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Button Text', type: 'string' }),
            defineField({ name: 'link', title: 'Button Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'secondaryCTA',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Button Text', type: 'string' }),
            defineField({ name: 'link', title: 'Button Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'availabilityNote',
          title: 'Availability Note',
          type: 'string',
          description: 'Small note below buttons (e.g., "✅ Elérhető online és személyesen Budapesten")',
        }),
      ],
    }),

    // Introduction Section
    defineField({
      name: 'intro',
      title: 'Introduction Section',
      type: 'object',
      group: 'intro',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'portableTextContent',
        }),
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          description: 'Text for the "learn more" link',
        }),
        defineField({
          name: 'linkUrl',
          title: 'Link URL',
          type: 'string',
          description: 'URL for the "learn more" link (e.g., /about)',
        }),
      ],
    }),

    // Services Overview Section
    defineField({
      name: 'servicesOverview',
      title: 'Services Overview Section',
      type: 'object',
      group: 'services',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'sectionSubtitle',
          title: 'Section Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'serviceCards',
          title: 'Service Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Helping Hands', value: 'FaHandsHelping' },
                      { title: 'Baby', value: 'FaBaby' },
                      { title: 'Calendar Check', value: 'FaCalendarCheck' },
                      { title: 'Heart', value: 'FaHeart' },
                      { title: 'Star', value: 'FaStar' },
                    ],
                  },
                }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                defineField({ name: 'link', title: 'Link', type: 'string' }),
              ],
              preview: {
                select: { title: 'title', icon: 'icon' },
                prepare({ title, icon }) {
                  return { title: title || 'Service Card', subtitle: icon };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'showTestimonials',
          title: 'Show Testimonials',
          type: 'boolean',
          description: 'Toggle to show/hide the testimonials section',
          initialValue: true,
        }),
        defineField({
          name: 'maxCount',
          title: 'Maximum Testimonials',
          type: 'number',
          description: 'Maximum number of testimonials to display',
          initialValue: 3,
          validation: (rule) => rule.min(1).max(6),
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
        title: 'Home Page',
        subtitle: 'Main landing page',
      };
    },
  },
});
