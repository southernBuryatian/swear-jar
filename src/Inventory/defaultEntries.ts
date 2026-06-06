export type JarEntry = {
  id: number;
  name: string;
  count: number;
};

export const defaultEntries: JarEntry[] = [
  { id: 1, name: 'Alex', count: 3 },
  { id: 2, name: 'Jordan', count: 1 },
  { id: 3, name: 'Sam', count: 2 },
];
