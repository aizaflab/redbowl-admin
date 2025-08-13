function getAuthData() {
  const data =localStorage.getItem("authToken") || {};
  return data;
}

export function accessToken() {
  const { accessToken } = getAuthData();
  return accessToken;
}

export function refreshToken() {
  const { refreshToken } = getAuthData();
  return refreshToken;
}

export function isAccessTokenExist() {
  return !!accessToken();
}

export function localDataSetter(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function localDataGetter(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function localDataRemove(key) {
  localStorage.removeItem(key);
}