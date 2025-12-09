import User from "@/src/model/entities/user";
import { AuthError } from "@/src/model/errors/authError";
import { IAuthService } from "@/src/model/services/iAuthService";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export class Firebase2AuthService implements IAuthService {
    
    async login(userName: string, password: string): Promise<User> {
        try{
            const uc = await signInWithEmailAndPassword(auth, userName, password);
            return {uID:uc.user.uid, userName:uc.user.email||''};
        }
        catch(error:any){

            if(error.code === 'auth/wrong-password'){
                throw new AuthError('Credenciais Inválidas');
            }
            throw new AuthError('Erro ao fazer login');
        }
        
    }
    async signup(userName: string, password: string): Promise<User> {
        try{
            const uc = await createUserWithEmailAndPassword(auth, userName, password);
            return {uID:uc.user.uid, userName:uc.user.email||''};
        }
        catch(error:any){
            throw new AuthError('Erro ao criar usuário');
        }
    }
    async logout(): Promise<void> {
        await auth.signOut();
    }
    onAuthStateChanged(callback: (user: User | null) => void): void {
        onAuthStateChanged(auth, (user) => {
            if(user){
                callback({uID:user.uid, userName:user.email||''});
            }
            else{
                callback(null);
            }
        });
    }
 
}