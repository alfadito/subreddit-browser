export const selectAuthToken = (state) => state.auth.token
export const selectAuthExpiry = (state) => state.auth.expiresAt
export const selectAuthStatus = (state) => state.auth.status