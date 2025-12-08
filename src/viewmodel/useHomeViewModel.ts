import { useEffect, useState } from "react";
import { IAuthUseCases } from "../usecase/iAuthUseCases";

export type HomeState = {
    userId: string | null
};

export type HomeActions = {
    logout: () => Promise<void>;
}

export default function useHomeViewModel(authUseCases: IAuthUseCases): HomeState & HomeActions {
    const [userId, setUserId] = useState<string | null>(' ');

    useEffect(()=>{
        authUseCases.onAuthStateChanged((user)=>{
            if(user){
                setUserId(user.uID);
            }else{
                setUserId(null);
            }
        });
    },[]);
    
    async function logout(): Promise<void> {
        await authUseCases.logout();
        setUserId(null);
    }

    return { userId, logout };
}

