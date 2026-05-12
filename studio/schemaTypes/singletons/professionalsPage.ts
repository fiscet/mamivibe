import { defineField, defineType } from 'sanity';
import { FaUserMd } from 'react-icons/fa';

export const professionalsPage = defineType({
  name: 'professionalsPage',
  title: 'Hasznos szakemberek oldal',
  type: 'document',
  icon: FaUserMd,
  groups: [
    { name: 'hero', title: 'Főszekció' },
    { name: 'content', title: 'Tartalom' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
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
        defineField({
          name: 'badge',
          title: 'Jelvény szöveg',
          type: 'string',
          description: 'Kis jelvény az alcím alatt (pl. "Zala Vármegye")',
        }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Bevezető szöveg',
      type: 'text',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'emptyStateMessage',
      title: 'Üres állapot üzenet',
      type: 'string',
      group: 'content',
      description: 'Üzenet, ami megjelenik, ha nincsenek elérhető szakemberek',
    }),
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
        title: 'Hasznos szakemberek oldal',
        subtitle: 'Hasznos szakemberek listázó oldal',
      };
    },
  },
});
