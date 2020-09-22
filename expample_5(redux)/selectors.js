import { createSelector } from 'reselect';
import get from 'lodash/get';
import generateSearchRegex from '../../utils/regEx/generateSearchRegex';
import highlightSearchTags from '../../utils/highlightSearchTags';

const suggestionsSelector = state => get(state, 'companyCreation.suggestions', []);
const suggestionQuerySelector = state => get(state, 'companyCreation.suggestionsQuery', '');

export default createSelector(
  suggestionsSelector,
  suggestionQuerySelector,
  (suggestions, suggestionQuery) => suggestions.map((suggestion) => {
    const searchExp = generateSearchRegex(suggestionQuery);

    return {
      name: highlightSearchTags(get(suggestion, 'item.name'), searchExp),
      description: highlightSearchTags(get(suggestion, 'item.description'), searchExp),
      addressSnippet: highlightSearchTags(get(suggestion, 'item.addressSnippet'), searchExp),
    };
  }),
);
