export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;
