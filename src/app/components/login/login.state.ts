 
import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { LoginService } from "@components/login/login.service";
import { Login } from "@components/login/login.actions";
import { LoginStateModel } from "@components/login/login.model";
import { catchError, delay, tap, throwError } from "rxjs";



@Injectable()
@State<LoginStateModel>({
    name: 'login',
    defaults: {
        access_token: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        temporal_secret_key: ''
    }
})
export class LoginState {
    private authService = inject(LoginService)

    @Action(Login)
    login(ctx: StateContext<LoginStateModel>, action: Login) {
        const { username, password } = action;
        const loginResultObs = this.authService.login(username, password);
        return loginResultObs.pipe(
            tap((response) => {
                const { access_token, first_name, last_name, email, temporal_secret } = response;
                console.log('Login successful:', response);
                ctx.patchState({
                    access_token,
                    first_name,
                    last_name,
                    username,
                    email,
                    temporal_secret_key: temporal_secret
                });
            }),
            catchError((error) => {
                console.error('Login failed:', error);
                return throwError(() => error);
            })
        )

        
    }
}
