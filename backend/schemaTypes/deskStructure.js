// deskStructure.js

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export const deskStructure = (S, context) =>
  S.list()
    .title('Posts')
    .items([
      orderableDocumentListDeskItem({ type: 'post', S, context }), // Make posts orderable
      S.divider(),
      // Add additional list items if
    ]);

export default deskStructure;
