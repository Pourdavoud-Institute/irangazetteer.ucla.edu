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
        roles[] {
            "title": roleTitle,
            "organization": roleOrganization
        },
        []
    ),
    "showPage": coalesce(showPage, false),
    "departments": coalesce(departments, []),
    institution,
    facultyTitle,
    facultyLink,
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
    showCV,
    "cvSections": coalesce(cvSections[] {
        _type,
        title,
        _type == "cvSection" => {
            "blocks": coalesce(blocks[]{
                ...,
                markDefs[] {
                    ...,
                    _type == "richTextLink" => ${LINK_PROJECTION}
                }
            }, [])
        },
        ${PUBLICATIONS_LIST_PROJECTION}
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
