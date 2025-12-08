import { FirebaseAuthService } from "../infra/services/firebase/firebaseAuthService";
import { AuthUseCases } from "../usecase/authUseCases";

const authService = new FirebaseAuthService();
const authUseCases = new AuthUseCases(authService);

export { authUseCases };
