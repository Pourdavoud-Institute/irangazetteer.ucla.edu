import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import type { GetImageResult } from 'astro';
import { urlForImage } from '@lib/sanity/urlForImage';
import v from 'voca';

// TODO: add expanded references for historical periods, authors, etc.
// TODO: replace featured image with Astro image build func
const places = await getCollection('places');
const authors = await getCollection('people');
const historicalPeriods = await getCollection('historicalPeriods');

const title = 'Iran Gazetteer Archaeological Sites';
const description =
    'GeoJSON Feature Collection data set of the archaeological sites featured on the Iran Gazatteer.';

export const GET = (async () => {
    return new Response(
        JSON.stringify({
            type: 'FeatureCollection',
            features: await Promise.all(
                places
                    .sort((a, b) => {
                        const titleA = v
                            .chain(a.data.title)
                            .latinise()
                            .slugify()
                            .value();
                        const titleB = v
                            .chain(b.data.title)
                            .latinise()
                            .slugify()
                            .value();

                        return titleA > titleB ? 1 : -1;
                    })
                    .map(async (place) => {
                        if (place.data.coordinates) {
                            const linkedAuthors = authors.filter((author) =>
                                place.data.authors.some(
                                    (a) => a._id === author.id,
                                ),
                            );
                            const linkedPeriods = historicalPeriods.filter(
                                (period) =>
                                    place.data.historicalPeriods.some(
                                        (p) => p._id === period.id,
                                    ),
                            );

                            let image: GetImageResult | undefined = undefined;
                            if (place.data.featuredImage) {
                                const src = urlForImage(
                                    place.data.featuredImage,
                                )
                                    .width(300)
                                    .height(200)
                                    .auto('format')
                                    .fit('crop')
                                    .url();
                                image = await getImage({
                                    src,
                                    width: 300,
                                    height: 200,
                                    format: 'webp',
                                });
                            }

                            return {
                                type: 'Feature',
                                id: place.data.placeID,
                                geometry: {
                                    type: 'Point',
                                    coordinates: [
                                        place.data.coordinates.lng,
                                        place.data.coordinates.lat,
                                    ],
                                },
                                properties: {
                                    place_id: place.data.placeID,
                                    title: place.data.title,
                                    uri: `https://irangazetteer.ucla.edu/sites/${place.data.placeID}`,
                                    persian_name: place.data.persianName,
                                    alternate_names: place.data.alternateNames,
                                    description: place.data.locationDescription,
                                    authors: linkedAuthors.map(
                                        (author) => author.data.title,
                                    ),
                                    featured_image: image ? image.src : null,
                                    historical_periods: linkedPeriods.map(
                                        (period) => period.data.title,
                                    ),
                                },
                            };
                        }
                    }),
            ),
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
}) satisfies APIRoute;
