export const Cookies = {
  set(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  },

  get(name: string): string | null {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] ?? null;
  },

  delete(name: string) {
    this.set(name, "", -1);
  },

  has(name: string): boolean {
    return this.get(name) !== null;
  }
};
