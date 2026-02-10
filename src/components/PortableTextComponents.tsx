import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.client';
import { stegaClean } from 'next-sanity';

// Helper function to get image size classes
const getImageSizeClasses = (size: string | undefined): string => {
  switch (size) {
    case 'small':
      return 'max-w-[25%]';
    case 'medium':
      return 'max-w-[50%]';
    case 'large':
      return 'max-w-[75%]';
    case 'full':
      return 'w-full';
    case 'original':
      return 'max-w-fit';
    default:
      return 'w-full';
  }
};

// Helper function to get image alignment classes
const getImageAlignmentClasses = (
  alignment: string | undefined,
  float: string | undefined
): string => {
  if (float === 'left') return 'float-left mr-6 mb-4';
  if (float === 'right') return 'float-right ml-6 mb-4';

  switch (alignment) {
    case 'left':
      return 'mr-auto';
    case 'right':
      return 'ml-auto';
    case 'center':
    default:
      return 'mx-auto';
  }
};

// Helper function to get border radius classes
const getBorderRadiusClasses = (borderRadius: string | undefined): string => {
  switch (borderRadius) {
    case 'small':
      return 'rounded';
    case 'medium':
      return 'rounded-lg';
    case 'large':
      return 'rounded-2xl';
    case 'full':
      return 'rounded-full';
    case 'none':
    default:
      return '';
  }
};

// Helper function to get callout styles
const getCalloutStyles = (
  type: string | undefined
): { bg: string; border: string; icon: string } => {
  switch (type) {
    case 'warning':
      return { bg: 'bg-yellow-50', border: 'border-yellow-400', icon: '⚠️' };
    case 'success':
      return { bg: 'bg-green-50', border: 'border-green-400', icon: '✅' };
    case 'error':
      return { bg: 'bg-red-50', border: 'border-red-400', icon: '❌' };
    case 'tip':
      return { bg: 'bg-purple-50', border: 'border-purple-400', icon: '💡' };
    case 'info':
    default:
      return { bg: 'bg-blue-50', border: 'border-blue-400', icon: 'ℹ️' };
  }
};

// Helper function to get table style classes
const getTableStyleClasses = (style: string | undefined): string => {
  switch (style) {
    case 'striped':
      return '[&_tbody_tr:nth-child(even)]:bg-gray-50';
    case 'bordered':
      return '[&_td]:border [&_th]:border [&_td]:border-gray-300 [&_th]:border-gray-300';
    case 'compact':
      return '[&_td]:py-1 [&_td]:px-2 [&_th]:py-1 [&_th]:px-2 text-sm';
    default:
      return '';
  }
};

// Helper function to get divider styles
const getDividerStyles = (style: string | undefined): string => {
  switch (style) {
    case 'dotted':
      return 'border-dotted';
    case 'dashed':
      return 'border-dashed';
    case 'space':
      return 'border-transparent';
    case 'line':
    default:
      return 'border-solid';
  }
};

// Helper function to get text color classes
const getTextColorClasses = (color: string | undefined): string => {
  switch (color) {
    case 'pink':
      return 'text-pink-600';
    case 'violet':
      return 'text-violet-600';
    case 'blue':
      return 'text-blue-600';
    case 'green':
      return 'text-green-600';
    case 'red':
      return 'text-red-600';
    case 'gray':
      return 'text-gray-500';
    default:
      return '';
  }
};

import type {
  TableCell,
  TableRow,
  TableBlockValue,
  CodeBlockValue,
  CalloutBlockValue,
  DividerBlockValue,
  ImageValue
} from '@/types/custom.types';

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
        {children}
      </h5>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-pink-400 pl-6 italic text-gray-700 my-6">
        {children}
      </blockquote>
    ),
    lead: ({ children }) => (
      <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
        {children}
      </p>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4 ml-4">
        {children}
      </ol>
    ),
    check: ({ children }) => (
      <ul className="space-y-2 text-gray-600 mb-4 ml-4">{children}</ul>
    )
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    check: ({ children }) => (
      <li className="leading-relaxed flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>{children}</span>
      </li>
    )
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    highlight: ({ children }) => (
      <mark className="bg-yellow-200 px-1 rounded">{children}</mark>
    ),
    sup: ({ children }) => <sup className="text-xs">{children}</sup>,
    sub: ({ children }) => <sub className="text-xs">{children}</sub>,
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      const openInNewTab = value?.openInNewTab || isExternal;
      return (
        <a
          href={href}
          className="text-pink-600 hover:text-pink-700 underline decoration-pink-300 hover:decoration-pink-600 transition-colors"
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      // Internal links would need to be resolved from the reference
      // For now, we'll render them as regular links
      const slug = value?.reference?.slug?.current;
      const href = slug ? `/${slug}` : '#';
      return (
        <a
          href={href}
          className="text-pink-600 hover:text-pink-700 underline decoration-pink-300 hover:decoration-pink-600 transition-colors"
        >
          {children}
        </a>
      );
    },
    textColor: ({ children, value }) => {
      const colorClass = getTextColorClasses(value?.color);
      return <span className={colorClass}>{children}</span>;
    }
  },
  types: {
    // Enhanced image with all options
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null;

      // Clean stega encoding from all string values to ensure CSS classes match correctly
      const cleanSize = stegaClean(value.size);
      const cleanAlignment = stegaClean(value.alignment);
      const cleanFloat = stegaClean(value.float);
      const cleanBorderRadius = stegaClean(value.borderRadius);
      const cleanAlt = stegaClean(value.alt) || '';
      const cleanCaption = stegaClean(value.caption);
      const cleanLink = stegaClean(value.link);
      const cleanCustomClass = stegaClean(value.customClass) || '';

      const sizeClasses = getImageSizeClasses(cleanSize);
      const borderRadiusClasses = getBorderRadiusClasses(cleanBorderRadius);
      const shadowClass = value.shadow ? 'shadow-lg' : '';
      const borderClass = value.border ? 'border-2 border-gray-200' : '';

      // Image-specific classes (visual styling)
      const imageClasses = [
        'h-auto',
        'w-full',
        borderRadiusClasses,
        shadowClass,
        borderClass,
        cleanCustomClass
      ]
        .filter(Boolean)
        .join(' ');

      // Figure classes for layout (size, alignment, float)
      const alignmentClasses = getImageAlignmentClasses(
        cleanAlignment,
        cleanFloat
      );
      const figureClasses = [sizeClasses, alignmentClasses]
        .filter(Boolean)
        .join(' ');

      const imageElement = (
        <img
          src={urlFor(value).width(1200).url()}
          alt={cleanAlt}
          className={imageClasses}
        />
      );

      const wrappedImage = cleanLink ? (
        <a
          href={cleanLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {imageElement}
        </a>
      ) : (
        imageElement
      );

      // Clear float after image if floating
      const clearFloat = cleanFloat && cleanFloat !== 'none';

      return (
        <>
          <figure
            className={`my-8 ${figureClasses} ${
              cleanFloat === 'none' || !cleanFloat ? 'clear-both' : ''
            }`}
          >
            {wrappedImage}
            {cleanCaption && (
              <figcaption className="text-center text-sm text-gray-500 mt-3">
                {cleanCaption}
              </figcaption>
            )}
          </figure>
          {clearFloat && <div className="clear-both" />}
        </>
      );
    },

    // Table block
    tableBlock: ({ value }: { value: TableBlockValue }) => {
      if (!value?.rows?.length) return null;

      const styleClasses = getTableStyleClasses(value.style);

      return (
        <div className="my-8 overflow-x-auto">
          <table className={`w-full border-collapse ${styleClasses}`}>
            {value.caption && (
              <caption className="text-sm text-gray-500 mb-2 text-left">
                {value.caption}
              </caption>
            )}
            <tbody>
              {value.rows.map((row, rowIndex) => {
                const isHeaderRow = value.hasHeaderRow && rowIndex === 0;
                return (
                  <tr
                    key={row._key}
                    className={isHeaderRow ? 'bg-gray-100' : ''}
                  >
                    {row.cells?.map((cell) => {
                      const CellTag =
                        isHeaderRow || cell.isHeader ? 'th' : 'td';
                      return (
                        <CellTag
                          key={cell._key}
                          className={`py-3 px-4 text-left ${
                            isHeaderRow || cell.isHeader
                              ? 'font-semibold text-gray-900'
                              : 'text-gray-600'
                          } border-b border-gray-200`}
                        >
                          {cell.content}
                        </CellTag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    },

    // Code/HTML block
    codeBlock: ({ value }: { value: CodeBlockValue }) => {
      if (!value?.code) return null;

      // If renderAsHtml is true and language is HTML, render as HTML
      if (value.renderAsHtml && value.language === 'html') {
        return (
          <div
            className="my-8 portable-text-html"
            dangerouslySetInnerHTML={{ __html: value.code }}
          />
        );
      }

      // Otherwise render as code block
      const lines = value.code.split('\n');

      return (
        <div className="my-8">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-400 text-xs">
              <span>{value.language || 'code'}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-100 font-mono">
                {value.showLineNumbers
                  ? lines.map((line, index) => (
                      <div key={index} className="flex">
                        <span className="text-gray-500 select-none w-8 text-right mr-4">
                          {index + 1}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))
                  : value.code}
              </code>
            </pre>
          </div>
        </div>
      );
    },

    // Callout/highlight block
    calloutBlock: ({ value }: { value: CalloutBlockValue }) => {
      const styles = getCalloutStyles(value?.type);

      return (
        <div
          className={`my-8 p-4 rounded-lg border-l-4 ${styles.bg} ${styles.border}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{styles.icon}</span>
            <div className="flex-1">
              {value?.title && (
                <h4 className="font-semibold text-gray-900 mb-1">
                  {value.title}
                </h4>
              )}
              {value?.content && (
                <p className="text-gray-700">{value.content}</p>
              )}
            </div>
          </div>
        </div>
      );
    },

    // Divider block
    dividerBlock: ({ value }: { value: DividerBlockValue }) => {
      const style = getDividerStyles(value?.style);

      if (value?.style === 'space') {
        return <div className="my-12" />;
      }

      return <hr className={`my-8 border-t-2 border-gray-200 ${style}`} />;
    }
  }
};
