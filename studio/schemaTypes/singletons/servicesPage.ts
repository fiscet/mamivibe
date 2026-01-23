import { defineField, defineType } from 'sanity';
import { FaTags } from 'react-icons/fa';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Szolgáltatások oldal',
  type: 'document',
  icon: FaTags,
  groups: [
    { name: 'hero', title: 'Főszekció' },
    { name: 'content', title: 'Tartalom' },
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
        defineField({
          name: 'badge',
          title: 'Jelvény szöveg',
          type: 'string',
          description: 'Kis jelvény az alcím alatt (pl. "💻 Online konzultáció • 🏠 Személyes tanácsadás")',
        }),
      ],
    }),

    // Content Section
    defineField({
      name: 'emptyStateMessage',
      title: 'Üres állapot üzenet',
      type: 'string',
      group: 'content',
      description: 'Üzenet, ami megjelenik, ha nincsenek elérhető szolgáltatások',
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
        title: 'Szolgáltatások oldal',
        subtitle: 'Szolgáltatások listázó oldal',
      };
    },
  },
});
