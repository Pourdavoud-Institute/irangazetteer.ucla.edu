import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { PAGES_QUERY } from '@lib/sanity/queries/pagesQuery';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';
import { PageModules } from '@content/schemaFragments/pageModules';
import {
    FeaturedImage,
    SEOBlock,
    OGBlock,
} from '@content/schemaFragments/sanityComponents';

const PageTypes = z.enum([
    'page_home',
    'page_default',
    'page_index',
    'page_people',
    'page_utility',
]);

export type PageTypes = z.infer<typeof PageTypes>;

const PageHeader = z.object({
    preview: z.nullable(z.array(z.any())),
    layout: z.enum(['default', 'centered', 'singleImage', 'splitPane']),
    image: FeaturedImage.nullish(),
});

export type PageHeader = z.infer<typeof PageHeader>;

/** Fetches page data from Sanity and creates typed schema */
export const pages = defineCollection({
    loader: customSanityLoader({
        name: 'Pages',
        query: PAGES_QUERY,
    }),

    schema: z.object({
        _id: z.string(),
        _type: PageTypes,
        title: z.string(),
        slug: z.string(),
        parent: z
            .object({
                title: z.string(),
                slug: z.string(),
            })
            .nullish(),
        children: z.array(
            z.object({
                _id: z.string(),
            }),
        ),
        header: PageHeader.nullish(),
        modules: PageModules,
        index: z
            .object({
                collection: z.enum(['places', 'historicalPeriods', 'posts']),
            })
            .nullish(),
        people: z
            .object({
                grid: z.array(
                    z.object({
                        _id: z.string(),
                    }),
                ),
                filter: z.string().nullish(),
            })
            .nullish(),
        options: z.object({
            layout: z.enum(['default', 'sidebar']).nullish(),
            footerMargin: z.boolean().nullish(),
        }),
        seo: SEOBlock,
        openGraph: OGBlock,
    }),
});
