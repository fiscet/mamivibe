import { defineField, defineType } from 'sanity';
import { FaTable, FaCode, FaHighlighter, FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';

// Custom table cell type
const tableCell = defineType({
  name: 'tableCell',
  title: 'Cella',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Tartalom',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'isHeader',
      title: 'Fejléc cella',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

// Custom table row type
const tableRow = defineType({
  name: 'tableRow',
  title: 'Sor',
  type: 'object',
  fields: [
    defineField({
      name: 'cells',
      title: 'Cellák',
      type: 'array',
      of: [{ type: 'tableCell' }],
    }),
  ],
});

// Table block type
const tableBlock = defineType({
  name: 'tableBlock',
  title: 'Táblázat',
  type: 'object',
  icon: FaTable,
  fields: [
    defineField({
      name: 'caption',
      title: 'Táblázat címe',
      type: 'string',
    }),
    defineField({
      name: 'rows',
      title: 'Sorok',
      type: 'array',
      of: [{ type: 'tableRow' }],
    }),
    defineField({
      name: 'hasHeaderRow',
      title: 'Első sor fejléc',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'style',
      title: 'Stílus',
      type: 'string',
      options: {
        list: [
          { title: 'Alapértelmezett', value: 'default' },
          { title: 'Csíkos', value: 'striped' },
          { title: 'Szegélyes', value: 'bordered' },
          { title: 'Kompakt', value: 'compact' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      rows: 'rows',
    },
    prepare({ caption, rows }) {
      const rowCount = rows?.length || 0;
      return {
        title: caption || 'Táblázat',
        subtitle: `${rowCount} sor`,
        media: FaTable,
      };
    },
  },
});

// Code/HTML block type
const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Kód / HTML',
  type: 'object',
  icon: FaCode,
  fields: [
    defineField({
      name: 'code',
      title: 'Kód',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'language',
      title: 'Nyelv',
      type: 'string',
      options: {
        list: [
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JSON', value: 'json' },
          { title: 'Egyéb', value: 'plaintext' },
        ],
      },
      initialValue: 'html',
    }),
    defineField({
      name: 'renderAsHtml',
      title: 'Renderelés HTML-ként',
      description: 'Ha bekapcsolod, a kód HTML-ként jelenik meg a weboldalon (csak HTML nyelv esetén)',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.language !== 'html',
    }),
    defineField({
      name: 'showLineNumbers',
      title: 'Sorszámok megjelenítése',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.renderAsHtml === true,
    }),
  ],
  preview: {
    select: {
      code: 'code',
      language: 'language',
      renderAsHtml: 'renderAsHtml',
    },
    prepare({ code, language, renderAsHtml }) {
      const preview = code?.substring(0, 50) || '';
      return {
        title: renderAsHtml ? 'HTML blokk' : `Kód (${language})`,
        subtitle: preview + (code?.length > 50 ? '...' : ''),
        media: FaCode,
      };
    },
  },
});

// Enhanced image block with more options
const enhancedImage = {
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternatív szöveg',
      description: 'Akadálymentességi leírás (SEO-hoz is fontos)',
      validation: (rule) => rule.required().warning('Az alt szöveg fontos az akadálymentességhez'),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Képaláírás',
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Méret',
      options: {
        list: [
          { title: 'Kicsi (25%)', value: 'small' },
          { title: 'Közepes (50%)', value: 'medium' },
          { title: 'Nagy (75%)', value: 'large' },
          { title: 'Teljes szélesség (100%)', value: 'full' },
          { title: 'Eredeti méret', value: 'original' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      title: 'Igazítás',
      options: {
        list: [
          { title: 'Balra', value: 'left' },
          { title: 'Középre', value: 'center' },
          { title: 'Jobbra', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'float',
      type: 'string',
      title: 'Szöveg körülfolyás',
      description: 'A szöveg körülfolyja a képet',
      options: {
        list: [
          { title: 'Nincs', value: 'none' },
          { title: 'Balra (szöveg jobbra)', value: 'left' },
          { title: 'Jobbra (szöveg balra)', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'borderRadius',
      type: 'string',
      title: 'Sarkok',
      options: {
        list: [
          { title: 'Szögletes', value: 'none' },
          { title: 'Enyhén lekerekített', value: 'small' },
          { title: 'Lekerekített', value: 'medium' },
          { title: 'Nagyon lekerekített', value: 'large' },
          { title: 'Kör/Ovális', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'shadow',
      type: 'boolean',
      title: 'Árnyék',
      initialValue: false,
    }),
    defineField({
      name: 'border',
      type: 'boolean',
      title: 'Szegély',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Hivatkozás',
      description: 'Kattintásra megnyíló URL',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'customClass',
      type: 'string',
      title: 'Egyéni CSS osztály',
      description: 'Haladó: egyéni CSS osztály hozzáadása',
    }),
  ],
};

// Callout/highlight block
const calloutBlock = defineType({
  name: 'calloutBlock',
  title: 'Kiemelés',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    defineField({
      name: 'type',
      title: 'Típus',
      type: 'string',
      options: {
        list: [
          { title: 'Információ', value: 'info' },
          { title: 'Figyelmeztetés', value: 'warning' },
          { title: 'Siker', value: 'success' },
          { title: 'Hiba', value: 'error' },
          { title: 'Tipp', value: 'tip' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Tartalom',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      content: 'content',
    },
    prepare({ title, type, content }) {
      const typeLabels: Record<string, string> = {
        info: 'ℹ️ Információ',
        warning: '⚠️ Figyelmeztetés',
        success: '✅ Siker',
        error: '❌ Hiba',
        tip: '💡 Tipp',
      };
      return {
        title: title || typeLabels[type] || 'Kiemelés',
        subtitle: content?.substring(0, 50) || '',
        media: FaHighlighter,
      };
    },
  },
});

// Divider/separator block
const dividerBlock = defineType({
  name: 'dividerBlock',
  title: 'Elválasztó',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Stílus',
      type: 'string',
      options: {
        list: [
          { title: 'Vonal', value: 'line' },
          { title: 'Pontozott', value: 'dotted' },
          { title: 'Szaggatott', value: 'dashed' },
          { title: 'Üres tér', value: 'space' },
        ],
      },
      initialValue: 'line',
    }),
  ],
  preview: {
    select: {
      style: 'style',
    },
    prepare({ style }) {
      return {
        title: 'Elválasztó',
        subtitle: style,
      };
    },
  },
});

export const portableTextContent = defineType({
  name: 'portableTextContent',
  title: 'Gazdag szöveges tartalom',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normál', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'Idézet', value: 'blockquote' },
        { title: 'Kiemelés', value: 'lead' },
      ],
      lists: [
        { title: 'Felsorolás', value: 'bullet' },
        { title: 'Számozott', value: 'number' },
        { title: 'Pipa lista', value: 'check' },
      ],
      marks: {
        decorators: [
          { title: 'Félkövér', value: 'strong' },
          { title: 'Dőlt', value: 'em' },
          { title: 'Aláhúzott', value: 'underline' },
          { title: 'Áthúzott', value: 'strike-through' },
          { title: 'Kód', value: 'code' },
          { title: 'Kiemelés', value: 'highlight' },
          { title: 'Felső index', value: 'sup' },
          { title: 'Alsó index', value: 'sub' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Hivatkozás',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Új ablakban nyílik',
                initialValue: false,
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Belső hivatkozás',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Oldal',
                to: [{ type: 'page' }],
              },
            ],
          },
          {
            name: 'textColor',
            type: 'object',
            title: 'Szöveg szín',
            fields: [
              {
                name: 'color',
                type: 'string',
                title: 'Szín',
                options: {
                  list: [
                    { title: 'Rózsaszín', value: 'pink' },
                    { title: 'Lila', value: 'violet' },
                    { title: 'Kék', value: 'blue' },
                    { title: 'Zöld', value: 'green' },
                    { title: 'Piros', value: 'red' },
                    { title: 'Szürke', value: 'gray' },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
    enhancedImage,
    { type: 'tableBlock' },
    { type: 'codeBlock' },
    { type: 'calloutBlock' },
    { type: 'dividerBlock' },
  ],
});

// Export all types that need to be registered
export const portableTextTypes = [
  tableCell,
  tableRow,
  tableBlock,
  codeBlock,
  calloutBlock,
  dividerBlock,
  portableTextContent,
];
