import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { PLACES_QUERY } from '@lib/sanity/queries/placesQuery';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';
import { RichText } from '@content/schemaFragments/pageModules';
import { FeaturedImage } from '@content/schemaFragments/sanityComponents';

const GeopointField = z.object({
    _type: z.literal('geopoint'),
    lat: z.number(),
    lng: z.number(),
});

export type GeopointField = z.infer<typeof GeopointField>;

export const places = defineCollection({
    loader: customSanityLoader({
        name: 'Places',
        query: PLACES_QUERY,
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('place'),
        _updatedAt: z.string(),
        title: z.string(),
        placeID: z.number().nullish(), // TODO: remove null option when required
        // slug: z.string(),
        persianName: z.string().nullish(),
        alternateNames: z.array(z.string()),
        featuredImage: FeaturedImage.nullish(),
        locationDescription: z.string().nullish(),
        coordinates: GeopointField.nullish(),
        articleContent: RichText.nullish(),
        // bibliography:
        authors: z.array(
            z.object({
                _id: z.string(),
                _type: z.literal('person'),
            }),
        ),
        publishDate: z.string().nullish(),
        revisedDate: z.string().nullish(),
        historicalPeriods: z.array(
            z.object({
                _id: z.string(),
                _type: z.literal('historicalPeriod'),
            }),
        ),
        categories: z.array(
            z.object({
                _id: z.string(),
                _type: z.literal('placeCategory'),
            }),
        ),
        references: z.object({
            pleiades_ref: z.url().nullish(),
            iranica_ref: z.url().nullish(),
        }),
    }),
});
