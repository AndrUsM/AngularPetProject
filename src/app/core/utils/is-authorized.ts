export const isAuthorized = () => {
  return Boolean(sessionStorage.getItem('auth-access-token') && sessionStorage.getItem('auth-refresh-token') && sessionStorage.getItem('base-user-info'))
}