import { defineField, defineType } from 'sanity';

export const slot = defineType({
  name: 'slot',
  title: 'Elérhetőségi időpont',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Dátum',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),
    defineField({
      name: 'availableTimes',
      title: 'Elérhető kezdési időpontok',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '08:00', value: '08:00' },
          { title: '08:30', value: '08:30' },
          { title: '09:00', value: '09:00' },
          { title: '09:30', value: '09:30' },
          { title: '10:00', value: '10:00' },
          { title: '10:30', value: '10:30' },
          { title: '11:00', value: '11:00' },
          { title: '11:30', value: '11:30' },
          { title: '12:00', value: '12:00' },
          { title: '12:30', value: '12:30' },
          { title: '13:00', value: '13:00' },
          { title: '13:30', value: '13:30' },
          { title: '14:00', value: '14:00' },
          { title: '14:30', value: '14:30' },
          { title: '15:00', value: '15:00' },
          { title: '15:30', value: '15:30' },
          { title: '16:00', value: '16:00' },
          { title: '16:30', value: '16:30' },
          { title: '17:00', value: '17:00' },
        ]
      },
      description: 'Válaszd ki az ezen a napon elérhető kezdési időpontokat. A foglalások eltávolítják az elérhetőséget.'
    }),
    defineField({
      name: 'isFullyBooked',
      title: 'Teljesen foglalt',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'date',
      subtitle: 'isFullyBooked'
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle ? 'Foglalt' : 'Elérhető'
      };
    }
  }
});
