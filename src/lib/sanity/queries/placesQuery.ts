import groq from 'groq';
import { RICH_TEXT_PROJECTION } from '@lib/sanity/groqFragments/moduleProjections';
import { FEATURED_IMAGE_PROJECTION } from '@lib/sanity/groqFragments/commonProjections';

export const PLACES_QUERY = groq`*[_type == "place"] {
    _id, 
    _type,
    _updatedAt,
    title,
    placeID,
    persianName,
    "alternateNames": coalesce(alternateNames[], []),
    "featuredImage": featuredImage ${FEATURED_IMAGE_PROJECTION},
    locationDescription,
    coordinates,
    "articleContent": richText {
        _type,
        ${RICH_TEXT_PROJECTION}
    },
    "authors": coalesce(authors[]->{
        _id,
        _type,
    }, []),
    publishDate,
    revisedDate,
    "historicalPeriods": coalesce(historicalPeriods[] {
        "_id": _ref,
        _type
    }, []),
    "categories": coalesce(categories[] {
        "_id": _ref,
        _type
    }, []),
    "references": {
        pleiades_ref,
        iranica_ref
    }
}`;
