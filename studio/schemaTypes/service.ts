import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Szolgáltatás',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Megnevezés',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Időtartam (perc)',
      type: 'number',
      options: {
        list: [30, 60, 90]
      }
    }),
    defineField({
      name: 'price',
      title: 'Ár (HUF)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Leírás',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Kép',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
