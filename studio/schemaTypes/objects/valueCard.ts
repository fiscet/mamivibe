import { defineField, defineType } from 'sanity';

export const valueCard = defineType({
  name: 'valueCard',
  title: 'Érték kártya',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      description: 'Ikon neve a react-icons könyvtárból (pl. FaHeart, FaHandsHelping, FaBaby)',
      options: {
        list: [
          { title: 'Szív', value: 'FaHeart' },
          { title: 'Segítő kezek', value: 'FaHandsHelping' },
          { title: 'Baba', value: 'FaBaby' },
          { title: 'Diplomasapka', value: 'FaGraduationCap' },
          { title: 'Csillag', value: 'FaStar' },
          { title: 'Naptár pipa', value: 'FaCalendarCheck' },
          { title: 'Pajzs', value: 'FaShieldAlt' },
          { title: 'Felhasználók', value: 'FaUsers' },
          { title: 'Villanykörte', value: 'FaLightbulb' },
          { title: 'Pipa kör', value: 'FaCheckCircle' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Leírás',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({ title, icon }) {
      return {
        title: title || 'Érték kártya',
        subtitle: icon || 'Nincs ikon kiválasztva',
      };
    },
  },
});
