import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: 'd65j5964',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2026-01-01',
});
