import { defineField, defineType } from 'sanity';
import { FaUserMd } from 'react-icons/fa';

export const PROFESSIONAL_CATEGORIES = [
  { title: 'Mozgás & torna', value: 'mozgas' },
  { title: 'Logopédia', value: 'logopedia' },
  { title: 'Zenei foglalkozás', value: 'zene' },
  { title: 'Babahordozás', value: 'babahordozas' },
  { title: 'Perinatális tanácsadás', value: 'perinatalis' },
  { title: 'Babaúszás', value: 'babauszas' },
  { title: 'Egyéb', value: 'egyeb' },
] as const;

export const professional = defineType({
  name: 'professional',
  title: 'Hasznos szakember',
  type: 'document',
  icon: FaUserMd,
  orderings: [
    {
      title: 'Pozíció szerint',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
    {
      title: 'Kategória szerint',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'position', direction: 'asc' },
      ],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Név / Megnevezés',
      type: 'string',
      description: 'A szakember vagy a hely neve (pl. "Gergye Andrea" vagy "Beszéd-Műhely")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Szakterület / Foglalkozás',
      type: 'string',
      description: 'Pl. "gyógytornász", "logopédus", "dúla"',
    }),
    defineField({
      name: 'category',
      title: 'Kategória',
      type: 'string',
      options: {
        list: PROFESSIONAL_CATEGORIES.map((c) => ({ title: c.title, value: c.value })),
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Pozíció',
      type: 'number',
      description: 'Sorrend a kategórián belül (kisebb szám = előrébb)',
      initialValue: 0,
    }),
    defineField({
      name: 'photo',
      title: 'Fotó (opcionális)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt szöveg',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Szolgáltatások',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'A nyújtott szolgáltatások listája',
    }),
    defineField({
      name: 'description',
      title: 'Leírás',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: 'Helyszín',
      type: 'object',
      fields: [
        defineField({ name: 'venue', title: 'Intézmény neve', type: 'string' }),
        defineField({ name: 'address', title: 'Cím', type: 'string' }),
        defineField({
          name: 'region',
          title: 'Vármegye',
          type: 'string',
          options: {
            list: [
              { title: 'Zala', value: 'zala' },
              { title: 'Vas', value: 'vas' },
              { title: 'Veszprém', value: 'veszprem' },
              { title: 'Egyéb', value: 'egyeb' },
            ],
          },
          initialValue: 'zala',
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Telefonszám',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Érvénytelen e-mail';
        }),
    }),
    defineField({
      name: 'website',
      title: 'Weboldal',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'], allowRelative: false }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      category: 'category',
      media: 'photo',
    },
    prepare({ title, role, category, media }) {
      const categoryLabel =
        PROFESSIONAL_CATEGORIES.find((c) => c.value === category)?.title || category;
      return {
        title,
        subtitle: [role, categoryLabel].filter(Boolean).join(' • '),
        media,
      };
    },
  },
});
