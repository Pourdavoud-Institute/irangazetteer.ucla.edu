import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { PEOPLE_QUERY } from '@lib/sanity/queries/peopleQuery';
import { SPEAKERS_QUERY } from '@lib/sanity/queries/speakersQuery';
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
        affiliation: z.enum(['internal', 'ucla', 'external']),
        showPage: z.boolean(),
        image: FeaturedImage.nullish(),
        roles: z.array(
            z.object({
                title: z.string(),
                organization: z.string(),
            }),
        ),
        departments: z.array(z.string()),
        institution: z.string().nullish(),
        facultyLink: z.string().nullish(),
        facultyTitle: z.string().nullish(),
        contact: z
            .object({
                email: z.string().nullish(),
            })
            .nullish(),
        biography: RichTextBlocks,
        showCV: z.boolean().nullish(),
        cvSections: z.array(
            z.union([
                z.object({
                    _type: z.literal('cvSection'),
                    title: z.string(),
                    blocks: RichTextBlocks,
                }),
                PublicationsList,
            ]),
        ),
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

export const speakers = defineCollection({
    loader: customSanityLoader({
        name: 'Speaker',
        query: SPEAKERS_QUERY,
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('speaker'),
        title: z.string(),
        slug: z.string(),
        name: z.object({
            firstName: z.string(),
            lastName: z.string(),
        }),
        image: FeaturedImage.nullish(),
        biography: RichTextBlocks,
        institution: z.string().nullish(),
        facultyLink: z.string().nullish(),
    }),
});
