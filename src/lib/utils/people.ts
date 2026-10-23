import type { CollectionEntry } from 'astro:content';
import {
    SanityUCLADepartments as departments,
    SanityPeopleCategories as categories,
} from '@lib/sanity/dicts';

/** Helper to match a person's role or faculty title with the workspace id
 * @param person Person collection entry
 * @returns Workspace role if exists, else faculty title, else institution, else undefined
 */
export const getPersonRole = (
    person: CollectionEntry<'people'>,
): string | undefined => {
    let role: string | undefined = undefined;
    if (person.data.affiliation == 'internal' && person.data.roles.length) {
        role = person.data.roles[0].title;
    } else if (person.data.facultyTitle) {
        role = person.data.facultyTitle;
    } else if (person.data.institution) {
        role = person.data.institution;
    } else if (
        person.data.categories.find((c) => c?._id === categories.gradStudent.id)
    ) {
        role = 'Graduate Student';
        if (person.data.department) {
            role += `, ${departments[person.data.department]}`;
        }
    }
    return role;
};
