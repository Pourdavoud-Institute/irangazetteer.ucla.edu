import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { PEOPLE_QUERY } from '@lib/sanity/queries/peopleQuery';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';
import {
    FeaturedImage,
    RichTextBlocks,
} from '@content/schemaFragments/sanityComponents';
import { PublicationsList } from './schemaFragments/pageModules';

export const people = defineCollection({
    loader: customSanityLoader({
        name: 'People',
        query: PEOPLE_QUERY,
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('person'),
        title: z.string(),
        slug: z.string(),
        affiliation: z.enum(['ucla', 'external']),
        showPage: z.boolean(),
        image: FeaturedImage.nullish(),
        roles: z.array(z.string()),
        institution: z.string().nullish(),
        externalLink: z.string().nullish(),
        facultyTitle: z.string().nullish(),
        contact: z
            .object({
                email: z.string().nullish(),
            })
            .nullish(),
        biography: RichTextBlocks,
        categories: z.array(
            z
                .object({
                    _id: z.string(),
                    _type: z.string(),
                    title: z.string(),
                    slug: z.string(),
                })
                .nullish(),
        ),
    }),
});
