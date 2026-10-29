import groq from 'groq';

const PLACE_CATEGORIES_PLACE_SUBQUERY = groq`*[_type == "place" && references(^._id)] {
    _id
}`;

export const PLACE_CATEGORIES_QUERY = groq`*[_type == "placeCategory"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "description": coalesce(description[], []),
    "places": coalesce(
        ${PLACE_CATEGORIES_PLACE_SUBQUERY},
        []
    )
}`;

const POST_CATEGORIES_POST_SUBQUERY = groq`*[_type == "post" && references(^._id)] | order(displayDate desc) {
    _id
}`;

export const POST_CATEGORIES_QUERY = groq`*[_type == "postCategory"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "posts": coalesce(
        ${POST_CATEGORIES_POST_SUBQUERY},
        []
    )
}`;
