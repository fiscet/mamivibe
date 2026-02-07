import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Blog bejegyzés',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL azonosító',
      type: 'slug',
      description: 'Az oldal egyedi azonosítója (pl. "elso-bejegyzes")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Rövid leírás',
      type: 'text',
      rows: 3,
      description: 'Rövid összefoglaló a bejegyzésről (megjelenik a listában)',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publikálás dátuma',
      type: 'datetime',
      description: 'A bejegyzés megjelenési dátuma',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Főkép',
      type: 'image',
      description: 'A bejegyzés főképe (megjelenik a listában és a bejegyzés tetején)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatív szöveg',
          description: 'Akadálymentességi leírás',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Tartalom',
      type: 'portableTextContent',
    }),
    defineField({
      name: 'seo',
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
    }),
  ],
  orderings: [
    {
      title: 'Publikálás dátuma (legújabb)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Publikálás dátuma (legrégebbi)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Cím (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'heroImage',
    },
    prepare({ title, publishedAt, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('hu-HU', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        : 'Nincs dátum';
      return {
        title: title || 'Névtelen',
        subtitle: date,
        media,
      };
    },
  },
});
