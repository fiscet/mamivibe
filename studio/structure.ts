import type { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/structure';
import { FaCalendarCheck, FaStar, FaTags, FaFileAlt, FaHome, FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { map, combineLatest } from 'rxjs';
import { singletonTypes } from './schemaTypes';

// Singleton page configurations
const singletonPages = [
  { type: 'homePage', title: 'Home', icon: FaHome, documentId: 'homePage' },
  { type: 'aboutPage', title: 'About', icon: FaUser, documentId: 'aboutPage' },
  { type: 'servicesPage', title: 'Services', icon: FaTags, documentId: 'servicesPage' },
  { type: 'bookingPage', title: 'Booking', icon: FaCalendarAlt, documentId: 'bookingPage' },
  { type: 'contactPage', title: 'Contact', icon: FaEnvelope, documentId: 'contactPage' },
];

// Define the groups for the structure
const groups = [
  {
    name: 'Bookings',
    icon: FaCalendarCheck,
    menuGroups: [
      ['appointment'],
      ['slot'],
    ]
  },
  {
    name: 'Feedback',
    icon: FaStar,
    menuGroups: [
      ['review'],
      ['contactMessage'],
    ]
  },
  {
    name: 'Configuration',
    icon: FaTags,
    menuGroups: [
      ['service'],
    ]
  }
];

export const structure: StructureResolver = (S: StructureBuilder, context: StructureResolverContext) => {
  const { documentStore } = context;

  // Observables for badge counts using listenQuery for real-time updates
  const newReviews$ = documentStore.listenQuery(
    'count(*[_type == "review" && approved == false])',
    {},
    { apiVersion: '2023-01-01' }
  );

  const newMessages$ = documentStore.listenQuery(
    'count(*[_type == "contactMessage" && status == "new"])',
    {},
    { apiVersion: '2023-01-01' }
  );

  return combineLatest([newReviews$, newMessages$]).pipe(
    map(([newReviews, newMessages]) => {
      const rCount = (newReviews as number) || 0;
      const mCount = (newMessages as number) || 0;
      const totalCount = rCount + mCount;

      return S.list()
        .title('Mamivibe')
        .items([
          // Pages Group - Singleton pages like Strapi single types
          S.listItem()
            .title('Pages')
            .id('pages')
            .icon(FaFileAlt)
            .child(
              S.list()
                .title('Pages')
                .items(
                  singletonPages.map((page) =>
                    S.listItem()
                      .title(page.title)
                      .id(page.type)
                      .icon(page.icon)
                      .child(
                        S.document()
                          .schemaType(page.type)
                          .documentId(page.documentId)
                          .title(page.title)
                      )
                  )
                )
            ),

          S.divider(),

          // Other groups (Bookings, Feedback, Configuration)
          ...groups.map((group) => {
            let title = group.name;
            if (group.name === 'Feedback' && totalCount > 0) {
              title = `${group.name} (${totalCount})`;
            }

            const item = S.listItem()
              .title(title)
              .id(group.name.toLowerCase())
              .icon(group.icon ?? null);

            return item.child(
              S.list()
                .title(title)
                .items([
                  ...group.menuGroups.flatMap(menuGroup =>
                    menuGroup.map(sType => {
                      let sTitle = sType === 'review' ? 'Review' :
                        sType === 'contactMessage' ? 'Contact Message' : sType;

                      if (sType === 'review' && rCount > 0) {
                        sTitle = `Reviews (${rCount})`;
                      } else if (sType === 'contactMessage' && mCount > 0) {
                        sTitle = `Contact Messages (${mCount})`;
                      }

                      return S.documentTypeListItem(sType)
                        .id(sType)
                        .title(sTitle)
                        .schemaType(sType);
                    })
                  )
                ])
            );
          }),

          S.divider(),

          // Blog/News pages (using the generic page type)
          S.documentTypeListItem('page')
            .title('Blog / News')
            .icon(FaFileAlt),

          // Filter out singleton types and already grouped types from the fallback
          ...S.documentTypeListItems().filter(
            (listItem) => {
              const id = listItem.getId();
              // Exclude singletons, grouped types, and the page type (already shown above)
              const groupedTypes = groups.flatMap(group => group.menuGroups.flat());
              return !singletonTypes.includes(id || '') &&
                !groupedTypes.includes(id || '') &&
                id !== 'page';
            }
          ),
        ]);
    })
  );
};
