'use client';

import { useActionState } from 'react';
import { createAppointment } from './actions';
import {
  FaCalendar,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaStickyNote
} from 'react-icons/fa';
import { Service } from '@/types/sanity.types';

const initialState = {
  message: '',
  success: false
};

export function BookingForm({
  services,
  preselectedServiceId,
  selectedDate,
  selectedSlot,
  meetingType
}: {
  services: Service[];
  preselectedServiceId?: string | null;
  selectedDate?: Date;
  selectedSlot?: string | null;
  meetingType?: 'online' | 'in-person';
}) {
  const [state, formAction, isPending] = useActionState(
    createAppointment,
    initialState
  );

  if (state?.success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Foglalási igény elküldve!
        </h3>
        <p className="text-gray-600">
          Hamarosan felveszem veled a kapcsolatot a megadott elérhetőségeken.
        </p>
      </div>
    );
  }

  // Calculate datetime string for hidden input if steps flow is used
  const dateTimeString =
    selectedDate && selectedSlot
      ? `${selectedDate.toISOString().split('T')[0]}T${selectedSlot}`
      : undefined;

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {state?.message && !state.success && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {state.message}
        </div>
      )}

      <div className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Szolgáltatás
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue={preselectedServiceId || ''}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
          >
            <option value="">Válassz szolgáltatást...</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title} ({s.price} Ft)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Név
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Teljes név"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email cím
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="pelda@mail.com"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefonszám
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="+36 30 123 4567"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Időpont
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendar className="text-gray-400" />
            </div>
            <input type="hidden" name="meetingType" value={meetingType || ''} />
            <input
              id="date"
              name="date"
              type={dateTimeString ? 'hidden' : 'datetime-local'}
              defaultValue={dateTimeString}
              required
              className={
                dateTimeString
                  ? 'hidden'
                  : 'pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
              }
            />
            {dateTimeString && (
              <input
                type="text"
                readOnly
                value={`${selectedDate?.toLocaleDateString(
                  'hu-HU'
                )} - ${selectedSlot}`}
                className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 sm:text-sm"
              />
            )}
          </div>
          {!dateTimeString && (
            <p className="mt-1 text-xs text-gray-500">
              A kiválasztott időpont csak tájékoztató jellegű, telefonon
              egyeztetjük a véglegesítést.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Megjegyzés (opcionális)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <FaStickyNote className="text-gray-400" />
            </div>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Miben segíthetek pontosan?"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="privacyConsent"
              required
              className="mt-1 h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">
              Elolvastam és elfogadom az{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 underline"
              >
                Adatvédelmi nyilatkozatot
              </a>{' '}
              és az{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 underline"
              >
                Általános Szerződési Feltételeket
              </a>
              . Hozzájárulok személyes adataim kezeléséhez a szolgáltatás
              nyújtása céljából.
            </span>
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? 'Küldés folyamatban...' : 'Foglalás küldése'}
        </button>
      </div>
    </form>
  );
}
