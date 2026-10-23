import groq from 'groq';
import { LINK_PROJECTION } from '@lib/sanity/groqFragments/commonProjections';

export const NAVIGATION_QUERY = groq`*[_type == "navigation"] {
    _id,
    _type,
    title,
    "items": coalesce(items[] {
        "itemType": _type,
        _type == "link" => ${LINK_PROJECTION},
        _type == "linkList" => {
            label,
            "links": coalesce(links[] ${LINK_PROJECTION}, [])
        }
    }, [])
}`;
