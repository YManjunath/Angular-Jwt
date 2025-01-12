import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { loginSuccess, logout } from "./user.actions";

export const userReducer = createReducer(
    initialUserState,
    on(loginSuccess, (state, { user, token}) => ({ ...state, user, token})),
    on(logout, () => initialUserState)
);