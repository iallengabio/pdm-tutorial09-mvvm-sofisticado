import User from "../model/entities/user";
import { ValidationError } from "../model/errors/validationError";
import { IUserRepository } from "../model/repositories/iUserRepository";
import { IAuthService } from "../model/services/iAuthService";
import { IAuthUseCases } from "./iAuthUseCases";

export class AuthUseCases implements IAuthUseCases {
  constructor(private authService: IAuthService, private userRepository: IUserRepository) { }

  async login(userName: string, password: string): Promise<User> {
    AuthValidator.validateLogin(userName, password);
    return this.authService.login(userName, password);
  }

  async signup(userName: string, email: string,  password: string, passwordConf: string): Promise<User> {
    try {
      AuthValidator.validateSignup(userName, password, passwordConf);
      const newUser = await this.authService.signup(email, password);
      newUser.userName = userName;
      await this.userRepository.createUser(newUser);
      return newUser;
    } catch (error) {
      alert(error);
      throw new Error("Error signing up");
    }
    
  }

  async logout(): Promise<void> {
    return this.authService.logout();
  }

  onAuthStateChanged(callback: (user: User | null) => void): void {
    this.authService.onAuthStateChanged(callback);
  }
}

class AuthValidator {
  static validateLogin(userName: string, password: string): void {
    if (!userName) {
      throw new ValidationError("User name is required");
    }

    if (!password) {
      throw new ValidationError("Password is required");
    }
  }

  static validateSignup(userName: string, password: string, passwordConf: string): void {
    if (!userName) {
      throw new ValidationError("User name is required");
    }

    if (!password) {
      throw new ValidationError("Password is required");
    }

    if (password !== passwordConf) {
      throw new ValidationError("Passwords do not match");
    }
  }
}