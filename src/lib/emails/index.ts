import { Resend } from 'resend';
import { Appointment, Service } from '@/types/sanity.types';
import { client as sanityClient } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

const resend = new Resend(process.env.RESEND_API_KEY);

async function getService(serviceId: string): Promise<Service> {
  const service = await sanityClient.fetch(groq`*[_type == "service" && _id == $serviceId][0]`, { serviceId });
  return service;
}

export async function sendBookingConfirmationEmail(appointment: Appointment) {
  const { clientName, email, preferredDate, service: serviceRef } = appointment;
  if (!serviceRef) return;

  const service = await getService(serviceRef._ref);

  try {
    await resend.emails.send({
      from: 'MamiVibe <noreply@mamivibe.hu>',
      to: email || '',
      subject: 'MamiVibe - Foglalás visszaigazolása',
      react: `<div>
          <h2>Kedves ${clientName},</h2>
          <p>Köszönjük, hogy a MamiVibe-ot választottad. A foglalásod részletei:</p>
          <ul>
            <li><strong>Szolgáltatás:</strong> ${service.title}</li>
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
  const { clientName, email, phone, preferredDate, service: serviceRef, notes } = appointment;
  if (!serviceRef) return;

  const service = await getService(serviceRef._ref);

  try {
    await resend.emails.send({
      from: 'MamiVibe <noreply@mamivibe.hu>',
      to: 'mamivibezala@gmail.com',
      subject: 'Új foglalás érkezett a MamiVibe-on keresztül',
      react: `<div>
          <h2>Új foglalás érkezett:</h2>
          <ul>
            <li><strong>Név:</strong> ${clientName}</li>
            <li><strong>E-mail:</strong> ${email}</li>
            <li><strong>Telefonszám:</strong> ${phone}</li>
            <li><strong>Szolgáltatás:</strong> ${service.title}</li>
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
