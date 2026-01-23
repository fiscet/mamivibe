import { defineField, defineType } from 'sanity';

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Kapcsolati üzenet',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Név',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail cím',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'message',
      title: 'Üzenet',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Létrehozva',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Állapot',
      type: 'string',
      options: {
        list: [
          { title: 'Új', value: 'new' },
          { title: 'Olvasott', value: 'read' },
          { title: 'Megválaszolt', value: 'replied' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const statusLabels: Record<string, string> = {
        new: 'Új',
        read: 'Olvasott',
        replied: 'Megválaszolt',
      };
      return {
        title: `${title} (${statusLabels[status] || status})`,
        subtitle,
      };
    },
  },
});
