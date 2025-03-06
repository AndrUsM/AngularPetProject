export const initSessionStorageMock = () => {
  const storage = (() => {
    let store: { [key: string]: string } = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => store[key] = value,
      removeItem: (key: string) => delete store[key],
      clear: () => store = {}
    };
  })();

  spyOn(sessionStorage, 'getItem')
    .and.callFake(storage.getItem);
  spyOn(sessionStorage, 'setItem')
    .and.callFake(storage.setItem);
  spyOn(sessionStorage, 'removeItem')
    .and.callFake(storage.removeItem);
  spyOn(sessionStorage, 'clear')
    .and.callFake(storage.clear)

  return storage;
}