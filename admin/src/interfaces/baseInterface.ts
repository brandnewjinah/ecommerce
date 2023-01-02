export interface GenericIF {
  [key: string]: string | undefined;
}

export interface BaseObjectIF {
  _id?: string;
  id: number;
  value: string;
}

export interface Status {
  status: number;
  message: string;
}
