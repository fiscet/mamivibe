import { defineField, defineType } from 'sanity';
import { FaStar } from 'react-icons/fa';

export const review = defineType({
  name: 'review',
  title: 'Értékelés',
  type: 'document',
  icon: FaStar,
  fields: [
    defineField({
      name: 'name',
      title: 'Értékelő neve',
      type: 'string',
      validation: (Rule) => Rule.required().error('Az értékelő neve kötelező'),
    }),
    defineField({
      name: 'rating',
      title: 'Értékelés (1-5)',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error('Az értékelés 1 és 5 között kell legyen'),
      options: {
        list: [
          { title: '⭐ 1 csillag', value: 1 },
          { title: '⭐⭐ 2 csillag', value: 2 },
          { title: '⭐⭐⭐ 3 csillag', value: 3 },
          { title: '⭐⭐⭐⭐ 4 csillag', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 csillag', value: 5 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'content',
      title: 'Vélemény szövege',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('A vélemény szövege kötelező'),
    }),
    defineField({
      name: 'reviewDate',
      title: 'Értékelés dátuma',
      type: 'date',
      description: 'Mikor írta az ügyfél az értékelést',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'approved',
      title: 'Jóváhagyva',
      type: 'boolean',
      initialValue: false,
      description: 'Csak a jóváhagyott értékelések jelennek meg az oldalon',
    }),
  ],
  orderings: [
    {
      title: 'Dátum szerint (legújabb elöl)',
      name: 'reviewDateDesc',
      by: [{ field: 'reviewDate', direction: 'desc' }],
    },
    {
      title: 'Értékelés szerint (legjobb elöl)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      approved: 'approved',
    },
    prepare({ title, rating, approved }) {
      const stars = '⭐'.repeat(rating || 0);
      return {
        title: title || 'Névtelen értékelő',
        subtitle: `${stars} ${approved ? '✅ Jóváhagyva' : '⏳ Jóváhagyásra vár'}`,
      };
    },
  },
});
