export interface UserState {
    user: { email: string; name: string} | null;
    token: string | null;
}

export const initialUserState: UserState = {
    user:null,
    token: null
}