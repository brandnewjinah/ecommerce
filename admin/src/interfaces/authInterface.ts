export interface CurrentUserIF {
  _id?: string;
  isAdmin?: boolean;
  name?: string;
  email?: string;
  token?: string;
}

export interface AuthIF {
  email?: string;
  password?: string;
}
