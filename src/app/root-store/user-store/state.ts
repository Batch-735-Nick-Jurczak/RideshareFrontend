import{ User } from '../../models/user';

export interface AppUserState{
  /**
   * Contains information for the current user in this session
   */
  readonly currentUser: User;

  /**
   * Contains all of the users known in the database
   */
  readonly allUsers: Array<User>;

  /**
   * Indicates the loading status of for the AppUserState
   */
  loading: boolean;

  /**
   * Indicates the error when manipulating the AppUserState if any
   */
  error: string;

}

export const initialState: AppUserState = {
    currentUser: undefined,
    allUsers:[],
    loading: false,
    error: undefined
};