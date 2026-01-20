import type { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/structure';
import { FaCalendarCheck, FaStar, FaTags } from 'react-icons/fa';
import { map, combineLatest, of } from 'rxjs';

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
          // Add a fallback list item for any types not in the groups
          ...S.documentTypeListItems().filter(
            (listItem) => {
              const id = listItem.getId();
              return !groups.some(group => group.menuGroups.flat().includes(id || ''));
            }
          ),
        ]);
    })
  );
};
