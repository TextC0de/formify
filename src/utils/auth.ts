const AUTH_TOKEN = 'auth-token';

export const getToken = (): string | null =>
    typeof window === 'undefined' ? null : localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: string | undefined): void => {
    if (token) localStorage.setItem(AUTH_TOKEN, token);
};
export const deleteToken = (): void => localStorage.removeItem(AUTH_TOKEN);
