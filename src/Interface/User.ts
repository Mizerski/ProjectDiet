export interface ISimpleUser {
  id: number;
  email: string;
  password: string;
}

export interface IUser extends ISimpleUser {
  token: string;
  name: string;
  confirmPassword: string;
  rememberMe: boolean;
}
