export interface IAuth {
  username: string;
  password: string;
}

export interface ILoggedUser {
  id: number;
  username: string;
  email: string;
  is_premium_user: boolean;
}
