import { defineType, defineField } from 'sanity';
import { FaColumns } from 'react-icons/fa';

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Lábléc beállítások',
  type: 'document',
  icon: FaColumns,
  fields: [
    defineField({
      name: 'description',
      title: 'Leírás',
      type: 'text',
      rows: 3,
      description: 'Rövid leírás a láblécben (pl. "Professzionális szoptatási tanácsadás...")',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Közösségi média linkek',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Facebook oldal URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Instagram profil URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'LinkedIn profil URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'YouTube csatorna URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
          description: 'TikTok profil URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url',
          description: 'Twitter/X profil URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'pinterest',
          title: 'Pinterest',
          type: 'url',
          description: 'Pinterest profil URL-je',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Lábléc beállítások',
      };
    },
  },
});
