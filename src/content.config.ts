/** Zod optional vs null
 * @link https://gist.github.com/ciiqr/ee19e9ff3bb603f8c42b00f5ad8c551e
 */
import { historicalPeriods } from '@content/historicalPeriods';
import { navigation } from '@content/navigation';
import { pages } from '@content/pages';
import { people } from '@content/people';
import { places } from '@content/places';
import { posts } from '@content/posts';
import { placeCategories, postCategories } from '@content/taxonomies';
import { settings } from '@content/settings';
import { works } from '@content/works';

export const collections = {
    historicalPeriods,
    navigation,
    pages,
    people,
    places,
    posts,
    placeCategories,
    postCategories,
    settings,
    works,
};
