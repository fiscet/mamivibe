import { defineField, defineType } from 'sanity';
import { FaUser } from 'react-icons/fa';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Rólam oldal',
  type: 'document',
  icon: FaUser,
  groups: [
    { name: 'hero', title: 'Főszekció' },
    { name: 'bio', title: 'Bemutatkozás' },
    { name: 'credentials', title: 'Képesítések' },
    { name: 'values', title: 'Értékek' },
    { name: 'cta', title: 'Cselekvésre ösztönzés' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Főszekció',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Cím',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Alcím',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    // Bio Section
    defineField({
      name: 'bio',
      title: 'Bemutatkozás szekció',
      type: 'object',
      group: 'bio',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'profileImage',
          title: 'Profilkép',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'experienceBadge',
          title: 'Tapasztalat jelvény',
          type: 'object',
          description: 'Kis jelvény a tapasztalati évek megjelenítéséhez',
          fields: [
            defineField({
              name: 'number',
              title: 'Szám',
              type: 'string',
              description: 'pl. "10+"',
            }),
            defineField({
              name: 'label',
              title: 'Felirat',
              type: 'string',
              description: 'pl. "Év tapasztalat"',
            }),
          ],
        }),
        defineField({
          name: 'name',
          title: 'Név',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Bemutatkozás szövege',
          type: 'portableTextContent',
          description: 'Fő életrajzi szöveg',
        }),
      ],
    }),

    // Credentials Section
    defineField({
      name: 'credentials',
      title: 'Képesítések',
      type: 'array',
      group: 'credentials',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Diplomasapka', value: 'FaGraduationCap' },
                  { title: 'Szív', value: 'FaHeart' },
                  { title: 'Tanúsítvány', value: 'FaCertificate' },
                  { title: 'Díj', value: 'FaAward' },
                  { title: 'Könyv', value: 'FaBook' },
                  { title: 'Sztetoszkóp', value: 'FaStethoscope' },
                ],
              },
            }),
            defineField({
              name: 'iconColor',
              title: 'Ikon színe',
              type: 'string',
              options: {
                list: [
                  { title: 'Rózsaszín', value: 'pink' },
                  { title: 'Lila', value: 'violet' },
                  { title: 'Kék', value: 'blue' },
                  { title: 'Zöld', value: 'green' },
                ],
              },
              initialValue: 'pink',
            }),
            defineField({ name: 'title', title: 'Cím', type: 'string' }),
            defineField({ name: 'description', title: 'Leírás', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title: title || 'Képesítés', subtitle: icon };
            },
          },
        },
      ],
    }),

    // Values Section
    defineField({
      name: 'values',
      title: 'Értékek szekció',
      type: 'object',
      group: 'values',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Szekció címe',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Érték elemek',
          type: 'array',
          of: [{ type: 'valueCard' }],
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'cta',
      title: 'Cselekvésre ösztönzés szekció',
      type: 'ctaBlock',
      group: 'cta',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO beállítások',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rólam oldal',
        subtitle: 'Bemutatkozó / Életrajz oldal',
      };
    },
  },
});
