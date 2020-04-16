import { UserActions, UserActionTypes } from "./actions";
import { initialState, AppUserState } from "./state";
import { User } from 'src/app/models/user';

export function UserReducer(
  state:  AppUserState = initialState,
  action: UserActions,
): AppUserState {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UserActionTypes.LOGIN_USER_SUCCESS:{
        return{
            ...state,
            currentUser: action.payload,
            loading:false,
            error:null
        }
    }
    case UserActionTypes.LOGIN_USER_FAILURE:{
        return{
            ...state,
            loading:false,
            error: action.payload
        }
    }
    case UserActionTypes.LOAD_ALL_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UserActionTypes.UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case UserActionTypes.LOAD_ALL_USERS_REQUEST:{
        return{
            ...state,
            loading:true,
            error:null
        };
    }

    default: {
      return state;
    }
  }
}
