import { defineField, defineType } from 'sanity';
import { FaHome } from 'react-icons/fa';

export const homePage = defineType({
  name: 'homePage',
  title: 'Főoldal',
  type: 'document',
  icon: FaHome,
  groups: [
    { name: 'hero', title: 'Főszekció' },
    { name: 'intro', title: 'Bemutatkozás' },
    { name: 'services', title: 'Szolgáltatások áttekintése' },
    { name: 'testimonials', title: 'Vélemények' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Főszekció',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'badge',
          title: 'Jelvény szöveg',
          type: 'string',
          description: 'Kis szöveg a cím felett (pl. "Szeretetteljes támogatás az anyaság útján")',
        }),
        defineField({
          name: 'title',
          title: 'Cím',
          type: 'string',
          description: 'Fő címsor',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'highlightedText',
          title: 'Kiemelt szöveg',
          type: 'string',
          description: 'Színátmenetes kiemelésű szöveg (a cím után jelenik meg)',
        }),
        defineField({
          name: 'subtitle',
          title: 'Alcím',
          type: 'text',
          rows: 2,
          description: 'Kiegészítő szöveg a cím alatt',
        }),
        defineField({
          name: 'heroImage',
          title: 'Főkép',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'primaryCTA',
          title: 'Elsődleges gomb',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Gomb szövege', type: 'string' }),
            defineField({ name: 'link', title: 'Gomb hivatkozása', type: 'string' }),
          ],
        }),
        defineField({
          name: 'secondaryCTA',
          title: 'Másodlagos gomb',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Gomb szövege', type: 'string' }),
            defineField({ name: 'link', title: 'Gomb hivatkozása', type: 'string' }),
          ],
        }),
        defineField({
          name: 'availabilityNote',
          title: 'Elérhetőségi megjegyzés',
          type: 'string',
          description: 'Kis megjegyzés a gombok alatt (pl. "✅ Elérhető online és személyesen")',
        }),
      ],
    }),

    // Introduction Section
    defineField({
      name: 'intro',
      title: 'Bemutatkozás szekció',
      type: 'object',
      group: 'intro',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'heading',
          title: 'Címsor',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Tartalom',
          type: 'portableTextContent',
        }),
        defineField({
          name: 'linkText',
          title: 'Hivatkozás szövege',
          type: 'string',
          description: 'A "tudj meg többet" hivatkozás szövege',
        }),
        defineField({
          name: 'linkUrl',
          title: 'Hivatkozás URL',
          type: 'string',
          description: 'A "tudj meg többet" hivatkozás URL-je (pl. /rolam)',
        }),
      ],
    }),

    // Services Overview Section
    defineField({
      name: 'servicesOverview',
      title: 'Szolgáltatások áttekintése szekció',
      type: 'object',
      group: 'services',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Szekció címe',
          type: 'string',
        }),
        defineField({
          name: 'sectionSubtitle',
          title: 'Szekció alcíme',
          type: 'string',
        }),
        defineField({
          name: 'serviceCards',
          title: 'Szolgáltatás kártyák',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ikon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Segítő kezek', value: 'FaHandsHelping' },
                      { title: 'Baba', value: 'FaBaby' },
                      { title: 'Naptár pipa', value: 'FaCalendarCheck' },
                      { title: 'Szív', value: 'FaHeart' },
                      { title: 'Csillag', value: 'FaStar' },
                      { title: 'Diplomasapka', value: 'FaGraduationCap' },
                      { title: 'Pajzs', value: 'FaShieldAlt' },
                      { title: 'Felhasználók', value: 'FaUsers' },
                      { title: 'Villanykörte', value: 'FaLightbulb' },
                      { title: 'Pipa kör', value: 'FaCheckCircle' },
                      { title: 'Egészségügyi', value: 'FaStethoscope' },
                      { title: 'Könyv', value: 'FaBook' },
                      { title: 'Oktatás', value: 'FaChalkboardTeacher' },
                      { title: 'Időzítő', value: 'FaClock' },
                      { title: 'Távirányítás', value: 'FaVideo' },
                      { title: 'Hívás', value: 'FaPhone' },
                      { title: 'E-mail', value: 'FaEnvelope' },
                      { title: 'Térkép', value: 'FaMapMarkerAlt' },
                      { title: 'Csomag', value: 'FaBox' },
                      { title: 'Arany', value: 'FaAward' },
                    ],
                  },
                }),
                defineField({ name: 'title', title: 'Cím', type: 'string' }),
                defineField({ name: 'description', title: 'Leírás', type: 'text', rows: 2 }),
                defineField({ name: 'link', title: 'Hivatkozás', type: 'string' }),
              ],
              preview: {
                select: { title: 'title', icon: 'icon' },
                prepare({ title, icon }) {
                  return { title: title || 'Szolgáltatás kártya', subtitle: icon };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Vélemények szekció',
      type: 'object',
      group: 'testimonials',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Szekció címe',
          type: 'string',
        }),
        defineField({
          name: 'showTestimonials',
          title: 'Vélemények megjelenítése',
          type: 'boolean',
          description: 'Kapcsoló a vélemények szekció megjelenítéséhez/elrejtéséhez',
          initialValue: true,
        }),
        defineField({
          name: 'maxCount',
          title: 'Maximum vélemények száma',
          type: 'number',
          description: 'Megjelenítendő vélemények maximális száma',
          initialValue: 3,
          validation: (rule) => rule.min(1).max(6),
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO beállítások',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Főoldal',
        subtitle: 'Fő nyitóoldal',
      };
    },
  },
});
