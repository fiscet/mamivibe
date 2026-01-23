import { defineField, defineType } from 'sanity';
import { FaEnvelope } from 'react-icons/fa';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kapcsolat oldal',
  type: 'document',
  icon: FaEnvelope,
  groups: [
    { name: 'hero', title: 'Főszekció' },
    { name: 'contact', title: 'Kapcsolati adatok' },
    { name: 'form', title: 'Űrlap beállítások' },
    { name: 'map', title: 'Térkép' },
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

    // Contact Information
    defineField({
      name: 'contactInfo',
      title: 'Kapcsolati adatok',
      type: 'object',
      group: 'contact',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Telefonszám',
              type: 'string',
              description: 'pl. +36 30 123 4567',
            }),
            defineField({
              name: 'hours',
              title: 'Elérhető időszak',
              type: 'string',
              description: 'pl. Hétköznap 9:00 - 17:00',
            }),
          ],
        }),
        defineField({
          name: 'email',
          title: 'E-mail',
          type: 'object',
          fields: [
            defineField({
              name: 'address',
              title: 'E-mail cím',
              type: 'string',
              description: 'pl. info@mamivibe.hu',
            }),
          ],
        }),
        defineField({
          name: 'location',
          title: 'Helyszín',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Utca, házszám',
              type: 'string',
              description: 'pl. 1111 Budapest, Példa utca 12.',
            }),
            defineField({
              name: 'note',
              title: 'Helyszín megjegyzés',
              type: 'string',
              description: 'pl. Személyes és online konzultáció is elérhető',
            }),
          ],
        }),
      ],
    }),

    // Form Settings
    defineField({
      name: 'form',
      title: 'Űrlap beállítások',
      type: 'object',
      group: 'form',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Űrlap címe',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Űrlap alcíme',
          type: 'string',
        }),
        defineField({
          name: 'responseTimeNote',
          title: 'Válaszidő megjegyzés',
          type: 'string',
          description: 'pl. Írj nekem, és igyekszem 24 órán belül válaszolni.',
        }),
        defineField({
          name: 'successMessage',
          title: 'Sikeres küldés üzenete',
          type: 'text',
          rows: 2,
          description: 'Üzenet, ami sikeres űrlap beküldés után jelenik meg',
        }),
      ],
    }),

    // Map Settings
    defineField({
      name: 'map',
      title: 'Térkép beállítások',
      type: 'object',
      group: 'map',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'showMap',
          title: 'Térkép megjelenítése',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'embedUrl',
          title: 'Google Maps beágyazási URL',
          type: 'url',
          description: 'Illeszd be ide a Google Maps beágyazási URL-t',
        }),
        defineField({
          name: 'coordinates',
          title: 'Koordináták',
          type: 'object',
          description: 'Alternatíva: add meg a koordinátákat egyéni térképhez',
          fields: [
            defineField({ name: 'lat', title: 'Szélesség', type: 'number' }),
            defineField({ name: 'lng', title: 'Hosszúság', type: 'number' }),
          ],
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
        title: 'Kapcsolat oldal',
        subtitle: 'Kapcsolati információk oldal',
      };
    },
  },
});
