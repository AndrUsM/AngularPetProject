import { isAuthorized } from "@core/utils/is-authorized";
import { initSessionStorageMock } from "@shared/utils/init-session-storage-mock";

describe("AppGuard", () => {
  beforeEach(() => {
    initSessionStorageMock();
  })

  afterEach(() => {
    sessionStorage.removeItem('auth-access-token');
    sessionStorage.removeItem('auth-refresh-token');
    sessionStorage.removeItem('base-user-info');
  })

  it('Limit access for not authorized users', () => {
    expect(isAuthorized()).toBe(false);
  })

  it('Grant access for authorized users', () => {
    sessionStorage.setItem('auth-access-token', 'test');
    sessionStorage.setItem('auth-refresh-token', 'test');
    sessionStorage.setItem('base-user-info', 'test');

    expect(isAuthorized()).toBe(true);
  })
});
