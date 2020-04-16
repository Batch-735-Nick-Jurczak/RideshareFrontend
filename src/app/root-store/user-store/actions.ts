import { Action } from "@ngrx/store";

import { User } from "../../models/user";

export enum UserActionTypes {
  LOGIN_USER_REQUEST = "[LOGIN] Login User",
  LOGIN_USER_SUCCESS = "[LOGIN] Login User Success",
  LOGIN_USER_FAILURE = "[LOGIN] Login User Fail",
  ADD_USER_REQUEST = "[USER] Add User",
  ADD_USER_SUCCESS = "[USER] Add User Success",
  ADD_USER_FAILURE = "[USER] Add User Failure",
  UPDATE_USER_REQUEST = "[USER] Updating User",
  UPDATE_USER_SUCCESS = "[USER] Updating User Success",
  UPDATE_USER_FAILURE = "[USER] Updating User Fail",
  LOAD_ALL_USERS_REQUEST = "[USER] Loading All Users",
  LOAD_ALL_USERS_SUCCESS = "[USER] Loading All Users Success",
  LOAD_ALL_USERS_FAILURE = "[USER] Loading All User Fail",
}
/**
 * The action class of trying to log a user in
 */
export class LoginUserAction implements Action {
    readonly type = UserActionTypes.LOGIN_USER_REQUEST;
    constructor(public payload:{username:string; password:string}){}
  }
  export class LoginUserSuccessAction implements Action {
    readonly type = UserActionTypes.LOGIN_USER_SUCCESS;
    constructor(public payload: User){}
  }
  export class LoginUserFailureAction implements Action {
    readonly type = UserActionTypes.LOGIN_USER_FAILURE;
    constructor(public payload: string){}
  }
/**
 * The action class of trying to add a user
 */
  export class AddUserAction implements Action {
    readonly type = UserActionTypes.ADD_USER_REQUEST;
    constructor(public payload:User){}
  }
  export class AddUserSuccessAction implements Action {
    readonly type = UserActionTypes.ADD_USER_SUCCESS;
    constructor(public payload: User){}
  }
  export class AddUserFailureAction implements Action {
    readonly type = UserActionTypes.ADD_USER_FAILURE;
    constructor(public payload: string){}
  }
/**
 * The action class of trying to update a  user 
 */
  export class UpdateUserAction implements Action {
    readonly type = UserActionTypes.UPDATE_USER_REQUEST;
    constructor(public payload: User){}
  }
  export class UpdateUserSuccessAction implements Action {
    readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload:User){}
  }
  export class UpdateUserFailureAction implements Action {
    readonly type = UserActionTypes.UPDATE_USER_FAILURE;
    constructor(public payload:string){}
  }

  /**
 * The action class of trying to Load aLL users 
 */
export class LoadUsersAction implements Action {
    readonly type = UserActionTypes.LOAD_ALL_USERS_REQUEST;
  }
  export class LoadUsersSuccessAction implements Action {
    readonly type = UserActionTypes.LOAD_ALL_USERS_SUCCESS;
    constructor(public payload: User[]){}
  }
  export class LoadUsersFailureAction implements Action {
    readonly type = UserActionTypes.LOAD_ALL_USERS_FAILURE;
    constructor(public payload: string){}
  }
/**
 * exporting the types of actions that can be used
 * with the
 */
  export type UserActions = 
  LoginUserAction 
  | LoginUserSuccessAction 
  | LoginUserFailureAction 
  | AddUserAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailureAction