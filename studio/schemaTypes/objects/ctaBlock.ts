import { defineField, defineType } from 'sanity';

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Cselekvésre ösztönző blokk',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Címsor',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Leírás',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryButton',
      title: 'Elsődleges gomb',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Gomb szövege',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Gomb hivatkozása',
          type: 'string',
          description: 'Belső útvonal (pl. /idopontfoglalas) vagy külső URL',
        }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Másodlagos gomb',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Gomb szövege',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Gomb hivatkozása',
          type: 'string',
          description: 'Belső útvonal (pl. /kapcsolat) vagy külső URL',
        }),
      ],
    }),
    defineField({
      name: 'style',
      title: 'Háttér stílus',
      type: 'string',
      options: {
        list: [
          { title: 'Rózsaszín-lila színátmenet', value: 'gradient-pink-violet' },
          { title: 'Világosszürke', value: 'light-gray' },
          { title: 'Fehér', value: 'white' },
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
        title: title || 'CTA blokk',
        subtitle: 'Cselekvésre ösztönzés',
      };
    },
  },
});
