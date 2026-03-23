import { Resend } from 'resend';
import { Appointment, Service } from '@/types/sanity.types';
import { client as sanityClient } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

const resend = new Resend(process.env.RESEND_API_KEY);

type ResolvedService = Pick<Service, '_id' | 'title'>;

type AppointmentServiceValue = Appointment['service'] | ResolvedService | null | undefined;

async function getService(serviceId: string): Promise<Service | null> {
  if (!serviceId) return null;
  const service = await sanityClient.fetch(groq`*[_type == "service" && _id == $serviceId][0]`, { serviceId });
  return service;
}

function isServiceReference(service: AppointmentServiceValue): service is NonNullable<Appointment['service']> {
  return Boolean(service && typeof service === 'object' && '_ref' in service && typeof service._ref === 'string');
}

function isResolvedService(service: AppointmentServiceValue): service is ResolvedService {
  return Boolean(service && typeof service === 'object' && '_id' in service && typeof service._id === 'string');
}

async function resolveAppointmentService(appointment: Appointment): Promise<ResolvedService | null> {
  const serviceValue = appointment.service as AppointmentServiceValue;

  if (isResolvedService(serviceValue)) {
    return serviceValue;
  }

  if (isServiceReference(serviceValue)) {
    const service = await getService(serviceValue._ref);

    if (service?._id) {
      return {
        _id: service._id,
        title: service.title
      };
    }
  }

  console.error('Service reference is missing or invalid');
  return null;
}

export async function sendBookingConfirmationEmail(appointment: Appointment) {
  const { clientName, email, preferredDate } = appointment;
  const service = await resolveAppointmentService(appointment);

  if (!service) {
    return;
  }

  try {
    const res = await resend.emails.send({
      from: 'MamiVibe <noreply@mamivibe.hu>',
      replyTo: 'mamivibezala@gmail.com',
      to: email || '',
      subject: 'MamiVibe - Foglalás visszaigazolása',
      html: `<div>
          <h2>Kedves ${clientName},</h2>
          <p>Köszönjük, hogy a MamiVibe-ot választottad. A foglalásod részletei:</p>
          <ul>
            <li><strong>Szolgáltatás:</strong> ${service?.title || 'N/A'}</li>
            <li><strong>Időpont:</strong> ${new Date(preferredDate || '').toLocaleString()}</li>
          </ul>
          <p>Hamarosan találkozunk!</p>
        </div>`
    });
  } catch (error) {
    console.error('Hiba a foglalás visszaigazoló e-mail küldésekor:', error);
    throw new Error('Nem sikerült elküldeni a foglalás visszaigazoló e-mailt.');
  }
}

export async function sendAdminBookingNotificationEmail(appointment: Appointment) {
  const { clientName, email, phone, preferredDate, notes } = appointment;
  const service = await resolveAppointmentService(appointment);

  if (!service) {
    return;
  }

  try {
    await resend.emails.send({
      from: 'MamiVibe <noreply@mamivibe.hu>',
      replyTo: 'mamivibezala@gmail.com',
      to: 'mamivibezala@gmail.com',
      subject: 'Új foglalás érkezett a MamiVibe-on keresztül',
      html: `<div>
          <h2>Új foglalás érkezett:</h2>
          <ul>
            <li><strong>Név:</strong> ${clientName}</li>
            <li><strong>E-mail:</strong> ${email}</li>
            <li><strong>Telefonszám:</strong> ${phone}</li>
            <li><strong>Szolgáltatás:</strong> ${service?.title || 'N/A'}</li>
            <li><strong>Időpont:</strong> ${new Date(preferredDate || '').toLocaleString()}</li>
            <li><strong>Megjegyzés:</strong> ${notes}</li>
          </ul>
        </div>`
    });
  } catch (error) {
    console.error('Hiba az adminisztrátori foglalási értesítő e-mail küldésekor:', error);
    throw new Error('Nem sikerült elküldeni az adminisztrátori foglalási értesítő e-mailt.');
  }
}
