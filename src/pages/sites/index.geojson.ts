import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// TODO: add expanded references for historical periods, authors, etc.
// TODO: replace featured image with Astro image build func
const places = await getCollection('places');
const authors = await getCollection('people');
const historicalPeriods = await getCollection('historicalPeriods');

const title = 'Iran Gazetteer Archaeological Sites';
const description =
    'GeoJSON Feature Collection data set of the archaeological sites featured on the Iran Gazatteer.';

export const GET = (() => {
    return new Response(
        JSON.stringify({
            type: 'FeatureCollection',
            features: places.map((place) => {
                if (place.data.coordinates) {
                    return {
                        type: 'Feature',
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
                            featured_image: place.data.featuredImage?.asset.url,
                        },
                    };
                }
            }),
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
}) satisfies APIRoute;
