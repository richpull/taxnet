import queryString from 'query-string';
export const queryParser = (search, options = {}) =>
  queryString.parse(search, { arrayFormat: 'bracket', ...options });
export const queryGenerate = (query = '', merge = {}, options = {}) =>
  queryString.stringify(
    {
      ...query,
      ...merge,
    },
    { arrayFormat: 'bracket', sort: false, ...options },
  );
