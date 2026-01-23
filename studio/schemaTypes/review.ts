import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Értékelés',
  type: 'document',
  fields: [
    defineField({
      name: 'appointment',
      title: 'Időpont',
      type: 'reference',
      to: [{ type: 'appointment' }]
    }),
    defineField({
      name: 'name',
      title: 'Értékelő neve',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Értékelés (1-5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'comment',
      title: 'Vélemény',
      type: 'text',
    }),
    defineField({
      name: 'approved',
      title: 'Jóváhagyva',
      type: 'boolean',
      initialValue: false,
      description: 'Csak a jóváhagyott értékelések jelennek meg az oldalon'
    })
  ],
});
