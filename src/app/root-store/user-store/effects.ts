import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';
import * as UserActions from './actions';
import { heLocale } from 'ngx-bootstrap';

@Injectable()
export class UserStoreEffects{
    constructor(
        private authService: AuthService,
        private userService: UserService, 
        private actions$: Actions) {}

  

    @Effect()
    loginRequestEffect$ = this.actions$.pipe(
        ofType<UserActions.LoginUserAction>(
            UserActions.UserActionTypes.LOGIN_USER_REQUEST
        ),
        switchMap(action =>
            this.authService
            .login(action.payload.username,action.payload.password)
            .pipe(
                map(
                    user => new UserActions.LoginUserSuccessAction(user)),
                catchError(error => observableOf(new UserActions.LoginUserFailureAction(error)))
            ))
    )

    @Effect()
   addUserEffect$ = this.actions$.pipe(
        ofType<UserActions.AddUserAction>(
            UserActions.UserActionTypes.ADD_USER_REQUEST
        ),
        switchMap(action =>
            this.userService.addUser(action.payload)
            .pipe(
                map(
                    user => new UserActions.AddUserSuccessAction(user)),
                catchError(error => observableOf(new UserActions.AddUserFailureAction(error)))
            ))
    )
    @Effect()
    updateUserEffect$ = this.actions$.pipe(
         ofType<UserActions.UpdateUserAction>(
             UserActions.UserActionTypes.UPDATE_USER_REQUEST
         ),
         switchMap(action =>
             this.userService.updateUserInfo(action.payload)
             .pipe(
                 map(
                     user => new UserActions.UpdateUserSuccessAction(user)),
                 catchError(error => observableOf(new UserActions.UpdateUserFailureAction(error)))
             ))
     )
     @Effect()
     loadUserEffect$ = this.actions$.pipe(
          ofType<UserActions.LoadUsersAction>(
              UserActions.UserActionTypes.LOAD_ALL_USERS_REQUEST
          ),
          switchMap(action =>
              this.userService.getAllUsers()
              .pipe(
                  map(
                      users => new UserActions.LoadUsersSuccessAction(users)),
                  catchError(error => observableOf(new UserActions.LoadUsersFailureAction(error)))
              ))
      )

}