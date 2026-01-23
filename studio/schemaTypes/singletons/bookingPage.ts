import { defineField, defineType } from 'sanity';
import { FaCalendarAlt } from 'react-icons/fa';

export const bookingPage = defineType({
  name: 'bookingPage',
  title: 'Időpontfoglalás oldal',
  type: 'document',
  icon: FaCalendarAlt,
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
      ],
    }),

    // Additional Instructions
    defineField({
      name: 'instructions',
      title: 'További útmutatás',
      type: 'portableTextContent',
      group: 'content',
      description: 'Opcionális további útmutatás vagy információ a foglaláshoz',
    }),

    // Confirmation Messages
    defineField({
      name: 'confirmationMessages',
      title: 'Visszaigazoló üzenetek',
      type: 'object',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'successTitle',
          title: 'Sikeres foglalás címe',
          type: 'string',
          description: 'Cím, ami sikeres foglalás után jelenik meg',
        }),
        defineField({
          name: 'successMessage',
          title: 'Sikeres foglalás üzenete',
          type: 'text',
          rows: 3,
          description: 'Üzenet, ami sikeres foglalás után jelenik meg',
        }),
      ],
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
        title: 'Időpontfoglalás oldal',
        subtitle: 'Időpontfoglalási oldal',
      };
    },
  },
});
