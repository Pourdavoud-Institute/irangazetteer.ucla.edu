import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { HISTORICAL_PERIODS_QUERY } from '@lib/sanity/queries/historicalPeriodsQuery';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';

export const historicalPeriods = defineCollection({
    loader: customSanityLoader({
        name: 'Historical Periods',
        query: HISTORICAL_PERIODS_QUERY,
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('historicalPeriod'),
        title: z.string(),
        slug: z.string(),
        startDate: z.number().nullish(),
        endDate: z.number().nullish(),
        description: z.array(z.any()),
        references: z.object({
            pleiades_ref: z.url().nullish(),
            periodo_ref: z.url().nullish(),
        }),
        places: z.array(
            z.object({
                _id: z.string(),
            }),
        ),
    }),
});
