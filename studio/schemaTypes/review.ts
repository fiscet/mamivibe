import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'appointment',
      title: 'Appointment',
      type: 'reference',
      to: [{ type: 'appointment' }]
    }),
    defineField({
      name: 'name',
      title: 'Reviewer Name',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved reviews are shown on the site'
    })
  ],
});
