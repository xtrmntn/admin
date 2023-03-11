const prefix = 'xtrmntn:admin';

export const storage = {
  get<T = string>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${prefix}:${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown) {
    localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value));
  },

  remove(key: string) {
    localStorage.removeItem(`${prefix}:${key}`);
  },
};
