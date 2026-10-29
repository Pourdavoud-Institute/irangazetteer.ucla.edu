import type { CollectionEntry } from 'astro:content';
import { format } from '@formkit/tempo';

/** Helper function to compose a citation for an archaeological place, based on authors and article content. Returns raw html markup to pass to Astro component. */
export const getPlaceCitation = (
    authors: CollectionEntry<'people'>[],
    title: string,
    permalink: string,
    publishDate?: string | null,
    revisedDate?: string | null,
): string => {
    let citation = '<div class="citation">';
    let authorsSegment = '';

    if (authors.length && authors.length <= 2) {
        authorsSegment = authors
            .map((author) => author.data.title)
            .join(' and ');
    } else if (authors.length > 2) {
        for (let i = 0; i < authors.length; i++) {
            const author = authors[i];
            if (i == 0) {
                authorsSegment = author.data.title;
            } else if (i == authors.length - 1) {
                authorsSegment = `, and ${author.data.title}`;
            } else {
                authorsSegment = `, ${author.data.title}`;
            }
        }
    }
    citation += `${authorsSegment}, “${title},” <em>Archaeological Gazetteer of Iran</em>,`;
    if (publishDate) {
        citation += ` ${format(publishDate, 'long')}`;
    }
    if (revisedDate) {
        citation += ` (revised ${format(revisedDate, 'long')})`;
    }
    citation += `, ${permalink}.`;

    return citation;
};
