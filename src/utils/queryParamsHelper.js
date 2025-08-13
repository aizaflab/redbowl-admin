export function buildQueryParams(params) {
  let queryParams = '';

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key) && params[key]) {
      if (queryParams !== '') {
        queryParams += '&';
      }
      queryParams += `${key}=${params[key]}`;
    }
  }

  return queryParams;
}