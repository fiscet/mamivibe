import { defineField, defineType } from 'sanity';

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Internal path (e.g., /booking) or external URL',
        }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Internal path (e.g., /contact) or external URL',
        }),
      ],
    }),
    defineField({
      name: 'style',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'Pink to Violet Gradient', value: 'gradient-pink-violet' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'White', value: 'white' },
        ],
      },
      initialValue: 'gradient-pink-violet',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'CTA Block',
        subtitle: 'Call to Action',
      };
    },
  },
});
