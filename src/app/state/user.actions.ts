import { createAction, props } from "@ngrx/store";

export const loginSuccess = createAction(
    '[Auth Api] login success',
    props<{ user: { email: string, name: string}, token:string}>()
);

export const logout = createAction('[Auth] logout');