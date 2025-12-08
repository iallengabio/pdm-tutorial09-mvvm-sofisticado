import { useState } from "react";
import User from "../model/entities/user";
import { ValidationError } from "../model/errors/validationError";
import { IAuthUseCases } from "../usecase/iAuthUseCases";

export type SignupState = {
    userId: string | null,
    error: string | null,
    loading: boolean
};

export type SignupActions = {
    cadastro: (email: string, password: string, passwordConf: string) => Promise<void>;
};

export default function useSignupViewModel(authUseCases: IAuthUseCases): SignupState & SignupActions {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    authUseCases.onAuthStateChanged((user: User | null)=>{
        if(user){
            setUserId(user.uID);
        }else{
            setUserId(null);
        }
    });

    async function cadastro(email: string, password: string, passwordConf: string): Promise<void> {
        setLoading(true);
        setError(null);
        try {
            await authUseCases.signup(email, password, passwordConf);
            
        }catch(error:any){
            if(error instanceof ValidationError){
                setError(error.message);
            }else{
                setError('Aconteceu um erro desconhecido!');
            }
        }

        setLoading(false);
        
    }

    return { userId, error, loading, cadastro };
}