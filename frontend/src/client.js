import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '7wz6aui0',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-08-05',
});

export default client;
