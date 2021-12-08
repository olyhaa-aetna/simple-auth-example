const AUTH_TOKENS = "auth_tokens";

function getAuthTokens() {
  try {
    const tokens = sessionStorage.getItem(AUTH_TOKENS);
    return tokens ? JSON.parse(tokens) : "";
  } catch (e) {
    return "";
  }
}

export const saveAuthTokens = (authTokens) => {
  window.sessionStorage.setItem(AUTH_TOKENS, JSON.stringify(authTokens));
};

export const isAuthenticated = () => {
  return !!getAuthTokens();
};
