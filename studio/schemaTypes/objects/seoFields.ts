import { defineField, defineType } from 'sanity';

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO beállítások',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta cím',
      type: 'string',
      description: 'Az oldal címének felülírása keresőmotorok számára (50-60 karakter ajánlott)',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta leírás',
      type: 'text',
      rows: 3,
      description: 'Leírás keresőmotorok számára (150-160 karakter ajánlott)',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'keywords',
      title: 'Kulcsszavak',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Releváns kulcsszavak keresőmotorok számára',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph kép',
      type: 'image',
      description: 'Kép közösségi megosztáshoz (ajánlott: 1200x630px)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatív szöveg',
          type: 'string',
          description: 'A kép alternatív szövege',
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Kanonikus URL',
      type: 'url',
      description: 'Kanonikus URL felülírása, ha a tartalom máshol is megjelenik',
    }),
    defineField({
      name: 'noIndex',
      title: 'Elrejtés keresőmotorok elől',
      type: 'boolean',
      description: 'Engedélyezd, hogy az oldal ne legyen indexelve keresőmotorok által',
      initialValue: false,
    }),
  ],
});
