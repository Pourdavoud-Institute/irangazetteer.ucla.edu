import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import {
    PLACE_CATEGORIES_QUERY,
    POST_CATEGORIES_QUERY,
} from '@lib/sanity/queries/taxonomyQueries';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';

export const PlaceCategory = z.object({
    _id: z.string(),
    _type: z.literal('placeCategory'),
    title: z.string(),
    slug: z.string(),
    description: z.array(z.any()),
    places: z.array(
        z.object({
            _id: z.string(),
        }),
    ),
});

export type PlaceCategory = z.infer<typeof PlaceCategory>;

export const placeCategories = defineCollection({
    loader: customSanityLoader({
        name: 'Place Categories',
        query: PLACE_CATEGORIES_QUERY,
    }),

    schema: PlaceCategory,
});

export const PostCategory = z.object({
    _id: z.string(),
    _type: z.literal('postCategory'),
    title: z.string(),
    slug: z.string(),
    posts: z.array(
        z.object({
            _id: z.string(),
        }),
    ),
});

export const postCategories = defineCollection({
    loader: customSanityLoader({
        name: 'Post Categories',
        query: POST_CATEGORIES_QUERY,
    }),

    schema: PostCategory,
});
