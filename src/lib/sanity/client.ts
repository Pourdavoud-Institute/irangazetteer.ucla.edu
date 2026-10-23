import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: 'jf3g9hnl',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2026-01-01',
});
