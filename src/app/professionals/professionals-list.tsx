'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  FaUserMd,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaExternalLinkAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import type {
  ProfessionalCategory,
  ProfessionalListItem,
} from '@/lib/queries/professionals';

const CATEGORY_LABELS: Record<ProfessionalCategory, string> = {
  mozgas: 'Mozgás & torna',
  logopedia: 'Logopédia',
  zene: 'Zenei foglalkozás',
  babahordozas: 'Babahordozás',
  perinatalis: 'Perinatális tanácsadás',
  babauszas: 'Babaúszás',
  egyeb: 'Egyéb',
};

const CATEGORY_ORDER: ProfessionalCategory[] = [
  'mozgas',
  'logopedia',
  'zene',
  'babahordozas',
  'perinatalis',
  'babauszas',
  'egyeb',
];

type Filter = 'all' | ProfessionalCategory;

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

function websiteLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function ProfessionalsList({
  professionals,
  emptyStateMessage,
}: {
  professionals: ProfessionalListItem[];
  emptyStateMessage?: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const availableCategories = useMemo(() => {
    const set = new Set(professionals.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => set.has(c));
  }, [professionals]);

  const filtered = useMemo(() => {
    if (filter === 'all') return professionals;
    return professionals.filter((p) => p.category === filter);
  }, [professionals, filter]);

  if (professionals.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">
          {emptyStateMessage || 'Jelenleg nincs elérhető szakember.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <FilterPill
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label={`Összes (${professionals.length})`}
        />
        {availableCategories.map((cat) => {
          const count = professionals.filter((p) => p.category === cat).length;
          return (
            <FilterPill
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
              label={`${CATEGORY_LABELS[cat]} (${count})`}
            />
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-6">
        {filtered.map((p) => (
          <ProfessionalCard key={p._id} professional={p} />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium text-sm shadow-md shadow-pink-500/25 transition-all'
          : 'px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm hover:border-pink-300 hover:text-pink-600 transition-all'
      }
    >
      {label}
    </button>
  );
}

function ProfessionalCard({ professional: p }: { professional: ProfessionalListItem }) {
  const photoUrl = p.photoUrl;
  const photoAlt = p.photoAlt || p.name;

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6 p-6">
        {/* Photo / Avatar */}
        <div className="flex-shrink-0 sm:w-32 flex justify-center">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <FaUserMd className="text-5xl text-pink-300" />
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
              {p.role && (
                <p className="text-sm text-gray-600">{p.role}</p>
              )}
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold whitespace-nowrap">
              {CATEGORY_LABELS[p.category]}
            </span>
          </div>

          {p.description && (
            <p className="text-gray-700 leading-relaxed mb-4">{p.description}</p>
          )}

          {/* Services list */}
          {p.services && p.services.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 mb-4">
              {p.services.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <FaCheckCircle className="text-pink-400 mt-1 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Contact row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm pt-3 border-t border-gray-100">
            {(p.location?.venue || p.location?.address) && (
              <div className="flex items-start gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-pink-500 mt-0.5 flex-shrink-0" />
                <span>
                  {p.location.venue && (
                    <strong className="text-gray-800">
                      {p.location.venue}
                    </strong>
                  )}
                  {p.location.venue && p.location.address && ', '}
                  {p.location.address}
                </span>
              </div>
            )}
            {p.phone && (
              <a
                href={telHref(p.phone)}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <FaPhone className="text-pink-500" />
                {p.phone}
              </a>
            )}
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors break-all"
              >
                <FaEnvelope className="text-pink-500" />
                {p.email}
              </a>
            )}
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <FaExternalLinkAlt className="text-pink-500" />
                {websiteLabel(p.website)}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
