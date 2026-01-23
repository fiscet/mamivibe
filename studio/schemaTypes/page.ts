import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Oldal',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL azonosító',
      type: 'slug',
      description: 'Az oldal egyedi azonosítója (pl. "rolam", "fooldal")',
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
      name: 'subtitle',
      title: 'Alcím',
      type: 'string',
      description: 'Opcionális szlogen vagy rövid leírás',
    }),
    defineField({
      name: 'heroImage',
      title: 'Főkép',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Tartalom',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normál', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Idézet', value: 'blockquote' },
          ],
          lists: [
            { title: 'Felsorolás', value: 'bullet' },
            { title: 'Számozott', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Félkövér', value: 'strong' },
              { title: 'Dőlt', value: 'em' },
              { title: 'Aláhúzott', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Hivatkozás',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
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
            {
              name: 'caption',
              type: 'string',
              title: 'Képaláírás',
            },
          ],
        },
      ],
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
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Névtelen',
        subtitle: `/${slug || ''}`,
      };
    },
  },
});
