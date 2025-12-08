import User from "@/src/model/entities/user";
import { AuthError } from "@/src/model/errors/authError";
import { IAuthService } from "@/src/model/services/iAuthService";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export class FirebaseAuthService implements IAuthService {

    async login(email: string, password: string): Promise<User> {

        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return {
                uID: userCredential.user.uid,
                userName: userCredential.user.displayName ?? userCredential.user.email ?? ''
            };
        } catch (error: any) {
            alert(error);
            throw new AuthError('Invalid Credentials');
        }
    }

    async signup(email: string, password: string): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try{const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            uID: userCredential.user.uid,
            userName: userCredential.user.displayName ?? userCredential.user.email ?? ''
        };}catch(error:any){
            alert(error);
            throw new AuthError('This account already exists or the password is invalid.');
        }
        
    }

    async logout() {
        await auth.signOut();
    }

    onAuthStateChanged(userSigned: (user: User | null) => void) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                userSigned({
                    uID: user.uid,
                    userName: user.displayName ?? user.email ?? ''
                });
            } else {
                userSigned(null);
            }
        });
    }

}