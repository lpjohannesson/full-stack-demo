import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { UserModel } from './api/models/UserModel';

interface UserContextType {
    user: UserModel | null;
    setUser: Dispatch<SetStateAction<UserModel | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
});