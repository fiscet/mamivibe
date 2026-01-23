import { defineField, defineType } from 'sanity';

export const portableTextContent = defineType({
  name: 'portableTextContent',
  title: 'Gazdag szöveges tartalom',
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
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternatív szöveg',
          description: 'Akadálymentességi leírás',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Képaláírás',
        }),
      ],
    },
  ],
});
