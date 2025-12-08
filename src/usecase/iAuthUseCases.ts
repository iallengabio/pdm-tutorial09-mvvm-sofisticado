import User from "../model/entities/user";

export interface IAuthUseCases {
  login(userName: string, password: string): Promise<User>;

  signup(userName: string, password: string, passwordConf: string): Promise<User>;

  logout(): Promise<void>;

  onAuthStateChanged(callback: (user: User | null) => void): void;
}