
export const saveCookies = (response: any) => {
  document.cookie = `accessToken=${response.data.accessToken}; Path=/; Secure; HttpOnly; SameSite=Strict`;
  document.cookie = `refreshToken=${response.data.refreshToken}; Path=/; Secure; HttpOnly; SameSite=Strict`;
};

export const clearCookies = () => {
  document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
};


