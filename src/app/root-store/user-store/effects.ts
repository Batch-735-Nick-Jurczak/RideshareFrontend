import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import * as UserActions from './actions';
import { heLocale } from 'ngx-bootstrap';

@Injectable()
export class UserStoreEffects{
    constructor(private dataService: AuthService, private actions$: Actions) {}

    user = {username:"hello",password:"password"}

    @Effect()
    loginRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.LoginUserAction>(
            UserActions.UserActionTypes.LOGIN_USER_REQUEST
        ),
        startWith(new UserActions.LoginUserAction(this.user)),
        switchMap(action =>
            this.dataService
            .login(this.user.username, this.user.password)
            .pipe(
                map(
                    user => new UserActions.LoginUserSuccessAction({user})),
                catchError(error => observableOf(new UserActions.LoginUserFailureAction({error})))
            ))
    )
}