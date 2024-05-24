

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export const deskStructure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({ type: 'post', S, context }), // Make posts orderable
      S.divider(),
      // Add a list item for categories
      S.documentTypeListItem('category').title('Categories'),
    ]);

export default deskStructure;
