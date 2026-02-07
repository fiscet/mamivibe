import { defineType, defineField } from 'sanity';
import { FaCog } from 'react-icons/fa';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Általános beállítások',
  type: 'document',
  icon: FaCog,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Weboldal neve',
      type: 'string',
      description: 'A weboldal neve (pl. "Mamivibe")',
      validation: (Rule) => Rule.required().error('A weboldal neve kötelező'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'A weboldal logója (fejléc és lábléc)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt szöveg',
          type: 'string',
          description: 'Alternatív szöveg a logóhoz (SEO és akadálymentesség)',
        }),
      ],
    }),
    defineField({
      name: 'logoWidth',
      title: 'Logo szélesség (px)',
      type: 'number',
      description: 'A logo megjelenítési szélessége pixelben (alapértelmezett: 150)',
      initialValue: 150,
      validation: (Rule) => Rule.min(50).max(400),
    }),
    defineField({
      name: 'logoHeight',
      title: 'Logo magasság (px)',
      type: 'number',
      description: 'A logo megjelenítési magassága pixelben (alapértelmezett: 50)',
      initialValue: 50,
      validation: (Rule) => Rule.min(20).max(200),
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics 4 Measurement ID',
      type: 'string',
      description: 'A GA4 mérési azonosító (pl. "G-XXXXXXXXXX"). Hagyd üresen, ha nem használsz analitikát.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true; // Optional field
          if (!/^G-[A-Z0-9]+$/.test(value)) {
            return 'A Measurement ID formátuma: G-XXXXXXXXXX';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Általános beállítások',
        subtitle: 'Weboldal beállítások',
        media,
      };
    },
  },
});
