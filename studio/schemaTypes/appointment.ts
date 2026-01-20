import { defineField, defineType } from 'sanity';

export const appointment = defineType({
  name: 'appointment',
  title: 'Appointment',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'preferredDate',
      title: 'Preferred Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meetingType',
      title: 'Meeting Type',
      type: 'string',
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'Személyesen (In-person)', value: 'in-person' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
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
      return {
        title: `${title} (${status})`,
        subtitle: `${subtitle} - ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      };
    },
  },
});
