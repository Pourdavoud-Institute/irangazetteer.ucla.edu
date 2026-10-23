import groq from 'groq';

const EVENT_CATEGORIES_EVENT_SUBQUERY = groq`*[_type == "event" && references(^._id)] | order(eventDetails.date.startDate desc) {
    _id
}`;

export const EVENT_CATEGORIES_QUERY = groq`*[_type == "eventCategory"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "events": coalesce(
        ${EVENT_CATEGORIES_EVENT_SUBQUERY},
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
