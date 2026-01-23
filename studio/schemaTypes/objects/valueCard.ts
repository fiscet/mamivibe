import { defineField, defineType } from 'sanity';

export const valueCard = defineType({
  name: 'valueCard',
  title: 'Value Card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from react-icons (e.g., FaHeart, FaHandsHelping, FaBaby)',
      options: {
        list: [
          { title: 'Heart', value: 'FaHeart' },
          { title: 'Helping Hands', value: 'FaHandsHelping' },
          { title: 'Baby', value: 'FaBaby' },
          { title: 'Graduation Cap', value: 'FaGraduationCap' },
          { title: 'Star', value: 'FaStar' },
          { title: 'Calendar Check', value: 'FaCalendarCheck' },
          { title: 'Shield', value: 'FaShieldAlt' },
          { title: 'Users', value: 'FaUsers' },
          { title: 'Lightbulb', value: 'FaLightbulb' },
          { title: 'Check Circle', value: 'FaCheckCircle' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
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
        title: title || 'Value Card',
        subtitle: icon || 'No icon selected',
      };
    },
  },
});
