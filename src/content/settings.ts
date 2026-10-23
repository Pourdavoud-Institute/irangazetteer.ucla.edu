import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { SITE_SETTINGS_QUERY } from '@lib/sanity/queries/siteSettingsQuery';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';
import { SEOBlock, OGBlock } from '@content/schemaFragments/sanityComponents';

export const settings = defineCollection({
    loader: customSanityLoader({
        name: 'Site Settings',
        query: SITE_SETTINGS_QUERY,
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('siteSettings'),
        siteName: z.string(),
        siteDomain: z.string(),
        seo: SEOBlock,
        openGraph: OGBlock,
    }),
});
