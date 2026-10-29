import groq from 'groq';

const HISTORICAL_PERIODS_PLACE_SUBQUERY = groq`*[_type == "place" && references(^._id)] {
    _id
}`;

export const HISTORICAL_PERIODS_QUERY = groq`*[_type == "historicalPeriod"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    startDate,
    endDate,
    "description": coalesce(description[], []),
    "references": {
        pleiades_ref,
        periodo_ref
    },
    "places": coalesce(
        ${HISTORICAL_PERIODS_PLACE_SUBQUERY},
        []
    )
}`;
