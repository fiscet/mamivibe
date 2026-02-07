'use client';

import { useActionState } from 'react';
import { sendContactMessage } from '@/app/contact/actions';

const initialState = {
  success: false,
  message: ''
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-8 rounded-xl text-center">
        <p className="font-bold text-lg mb-2">Üzenet elküldve! ✅</p>
        <p>{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-sm underline hover:text-green-800"
        >
          Új üzenet küldése
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Név
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          placeholder="Teljes név"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email cím
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          placeholder="pelda@mail.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Üzenet
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Miben segíthetek?"
        ></textarea>
      </div>

      <div>
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
            </a>
            . Hozzájárulok személyes adataim kezeléséhez a kapcsolatfelvétel
            céljából.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
      >
        {isPending ? 'Küldés folyamatban...' : 'Üzenet elküldése'}
      </button>
    </form>
  );
}
