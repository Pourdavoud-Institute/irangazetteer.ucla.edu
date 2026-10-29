import groq from 'groq';
import {
    FEATURED_IMAGE_PROJECTION,
    LINK_PROJECTION,
} from '@lib/sanity/groqFragments/commonProjections';
import { PUBLICATIONS_LIST_PROJECTION } from '../groqFragments/moduleProjections';

export const PEOPLE_QUERY = groq`*[_type == "person"] {
    _id,
    _type,
    title,
    "slug": slug.current,
    affiliation,
    "image": headshot ${FEATURED_IMAGE_PROJECTION},
    "roles": coalesce(
        roles[],
        []
    ),
    "showPage": coalesce(showPage, false),
    institution,
    facultyTitle,
    externalLink,
    "contact": {
        email,
    },
    "biography": coalesce(biography[] {
        ...,
        markDefs[] {
            ...,
            _type == "richTextLink" => ${LINK_PROJECTION}
        }
    }, []),
    "categories": coalesce(
        categories[]->{
            _id,
            _type,
            title,
            "slug": slug.current
        }
    )
}`;
