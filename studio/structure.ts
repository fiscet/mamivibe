import type { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/structure';
import { FaCalendarCheck, FaStar, FaTags, FaFileAlt, FaHome, FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { map, combineLatest } from 'rxjs';
import { singletonTypes } from './schemaTypes';

// Singleton page configurations
const singletonPages = [
  { type: 'homePage', title: 'Főoldal', icon: FaHome, documentId: 'homePage' },
  { type: 'aboutPage', title: 'Rólam', icon: FaUser, documentId: 'aboutPage' },
  { type: 'servicesPage', title: 'Szolgáltatások', icon: FaTags, documentId: 'servicesPage' },
  { type: 'bookingPage', title: 'Időpontfoglalás', icon: FaCalendarAlt, documentId: 'bookingPage' },
  { type: 'contactPage', title: 'Kapcsolat', icon: FaEnvelope, documentId: 'contactPage' },
];

// Define the groups for the structure
const groups = [
  {
    id: 'bookings',
    title: 'Foglalások',
    icon: FaCalendarCheck,
    menuGroups: [
      ['appointment'],
      ['slot'],
    ]
  },
  {
    id: 'feedback',
    title: 'Visszajelzések',
    icon: FaStar,
    menuGroups: [
      ['review'],
      ['contactMessage'],
    ]
  },
  {
    id: 'configuration',
    title: 'Beállítások',
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
            .title('Oldalak')
            .id('pages')
            .icon(FaFileAlt)
            .child(
              S.list()
                .title('Oldalak')
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

          // Other groups (Foglalások, Visszajelzések, Beállítások)
          ...groups.map((group) => {
            let displayTitle = group.title;
            if (group.id === 'feedback' && totalCount > 0) {
              displayTitle = `${group.title} (${totalCount})`;
            }

            const item = S.listItem()
              .title(displayTitle)
              .id(group.id)
              .icon(group.icon ?? null);

            return item.child(
              S.list()
                .title(displayTitle)
                .items([
                  ...group.menuGroups.flatMap(menuGroup =>
                    menuGroup.map(sType => {
                      let sTitle = sType === 'review' ? 'Értékelések' :
                        sType === 'contactMessage' ? 'Üzenetek' : sType;

                      if (sType === 'review' && rCount > 0) {
                        sTitle = `Értékelések (${rCount})`;
                      } else if (sType === 'contactMessage' && mCount > 0) {
                        sTitle = `Üzenetek (${mCount})`;
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
            .title('Blog / Hírek')
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
