import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Szolgáltatás',
  type: 'document',
  orderings: [
    {
      title: 'Pozíció szerint',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'position',
      title: 'Pozíció',
      type: 'number',
      description: 'Sorrend a listában (kisebb szám = előrébb)',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'title',
      title: 'Megnevezés',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meetingType',
      title: 'Találkozó típusa',
      type: 'string',
      description: 'A szolgáltatás típusa - ez automatikusan beállítódik a foglalásnál',
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'Személyesen', value: 'in-person' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Időtartam (perc)',
      type: 'number',
      options: {
        list: [10, 30, 60, 90]
      }
    }),
    defineField({
      name: 'price',
      title: 'Ár (HUF)',
      type: 'number',
      description: 'Numerikus ár a számításokhoz',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'priceDisplay',
      title: 'Ár megjelenítése',
      type: 'string',
      description: 'Szöveges ár a listában való megjelenítéshez (pl. "15.000 Ft", "Ingyenes", "Egyedi árajánlat")',
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
  preview: {
    select: {
      title: 'title',
      position: 'position',
      price: 'priceDisplay',
      meetingType: 'meetingType',
      media: 'image',
    },
    prepare({ title, position, price, meetingType, media }) {
      const typeLabel = meetingType === 'online' ? '💻' : meetingType === 'in-person' ? '🏠' : '';
      return {
        title: `${position ?? 0}. ${title} ${typeLabel}`,
        subtitle: price || '',
        media,
      };
    },
  },
});
