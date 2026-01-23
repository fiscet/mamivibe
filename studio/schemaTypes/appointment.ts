import { defineField, defineType } from 'sanity';

export const appointment = defineType({
  name: 'appointment',
  title: 'Időpont',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Ügyfél neve',
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
      name: 'phone',
      title: 'Telefonszám',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Szolgáltatás',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'preferredDate',
      title: 'Kívánt időpont',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meetingType',
      title: 'Találkozó típusa',
      type: 'string',
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'Személyesen', value: 'in-person' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Állapot',
      type: 'string',
      options: {
        list: [
          { title: 'Függőben', value: 'pending' },
          { title: 'Megerősítve', value: 'confirmed' },
          { title: 'Lemondva', value: 'cancelled' },
          { title: 'Teljesítve', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'notes',
      title: 'Megjegyzések',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'service.title',
      date: 'preferredDate',
      status: 'status',
    },
    prepare({ title, subtitle, date, status }) {
      const statusLabels: Record<string, string> = {
        pending: 'Függőben',
        confirmed: 'Megerősítve',
        cancelled: 'Lemondva',
        completed: 'Teljesítve',
      };
      return {
        title: `${title} (${statusLabels[status] || status})`,
        subtitle: `${subtitle} - ${date ? new Date(date).toLocaleDateString('hu-HU') : 'Nincs dátum'}`,
      };
    },
  },
});
