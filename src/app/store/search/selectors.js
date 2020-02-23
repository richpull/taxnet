import { getSearch } from 'connected-react-router';
import { createSelector } from 'reselect';
import { queryParser } from '../../util/queryParser';

export const selectorSearchGetParams = createSelector([getSearch], search => queryParser(search));
