import { defineField, defineType } from 'sanity';
import { FaUser } from 'react-icons/fa';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: FaUser,
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'bio', title: 'Bio Section' },
    { name: 'credentials', title: 'Credentials' },
    { name: 'values', title: 'Values' },
    { name: 'cta', title: 'Call to Action' },
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

    // Bio Section
    defineField({
      name: 'bio',
      title: 'Bio Section',
      type: 'object',
      group: 'bio',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'experienceBadge',
          title: 'Experience Badge',
          type: 'object',
          description: 'Small badge showing years of experience',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'e.g., "10+"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Év tapasztalat"',
            }),
          ],
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Bio Content',
          type: 'portableTextContent',
          description: 'Main biography text',
        }),
      ],
    }),

    // Credentials Section
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      group: 'credentials',
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
                  { title: 'Graduation Cap', value: 'FaGraduationCap' },
                  { title: 'Heart', value: 'FaHeart' },
                  { title: 'Certificate', value: 'FaCertificate' },
                  { title: 'Award', value: 'FaAward' },
                  { title: 'Book', value: 'FaBook' },
                  { title: 'Stethoscope', value: 'FaStethoscope' },
                ],
              },
            }),
            defineField({
              name: 'iconColor',
              title: 'Icon Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Pink', value: 'pink' },
                  { title: 'Violet', value: 'violet' },
                  { title: 'Blue', value: 'blue' },
                  { title: 'Green', value: 'green' },
                ],
              },
              initialValue: 'pink',
            }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title: title || 'Credential', subtitle: icon };
            },
          },
        },
      ],
    }),

    // Values Section
    defineField({
      name: 'values',
      title: 'Values Section',
      type: 'object',
      group: 'values',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Value Items',
          type: 'array',
          of: [{ type: 'valueCard' }],
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'ctaBlock',
      group: 'cta',
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
        title: 'About Page',
        subtitle: 'About me / Bio page',
      };
    },
  },
});
