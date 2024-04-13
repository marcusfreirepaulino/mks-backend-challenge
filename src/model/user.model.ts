export interface UserModel {
  id: number;
  name: string;
  email: string;
}

export interface AuthModel extends UserModel {
  password: string;
  salt: string;
}

export type UserInputModel = Omit<AuthModel, 'id'>;

export interface LoginInputModel {
  email: string;
  password: string;
}

export interface LoginModel {
  token: string;
}
