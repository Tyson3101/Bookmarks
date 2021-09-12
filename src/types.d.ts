class Link {
  image: string;
  url: string;
  name: string;
  id?: string;
  description?: string;
}

interface DataInterface {
  get: (key: string) => any;
  set: (key: string, value: Link[]) => any;
  clear: () => any;
}
