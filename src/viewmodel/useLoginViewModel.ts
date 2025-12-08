import { useState } from "react";
import { default as MyUser, default as User } from "../model/entities/user";
import { AuthError } from "../model/errors/authError";
import { ValidationError } from "../model/errors/validationError";
import { IAuthUseCases } from "../usecase/iAuthUseCases";

export type LoginState = {
    userId: string | null,
    error: string | null,
    loading: boolean
};

export type LoginActions = {
    login: (email: string, password: string) => Promise<void>;
};

export default function useLoginViewModel(authUseCases: IAuthUseCases): LoginState & LoginActions {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    authUseCases.onAuthStateChanged((user : User | null)=>{
        if(user){
            setUserId(user.uID);
        }else{
            setUserId(null);
        }
    });

    async function login(email: string, password: string): Promise<void> {
        setLoading(true);
        setError(null);

        
        try {
            let user: MyUser = await authUseCases.login(email, password);
            setUserId(user.uID);
        }catch(error:unknown){
            if(error instanceof ValidationError){
                setError(error.message);
            }else if(error instanceof AuthError){
                setError(error.message);
            }else{
                setError('Aconteceu um erro desconhecido!');
            }
        }

        setLoading(false);
        
    }

    return { userId, error, loading, login };
}