import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginState } from "@components/login/login.state";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private store = inject(Store);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token  = this.store.selectSnapshot(LoginState.accessToken);
        const secret = this.store.selectSnapshot(LoginState.temporalSecretKey);

        if (!token) return next.handle(req);

        return next.handle(req.clone({
            setHeaders: {
                'Authorization':       `Bearer ${token}`,
                'Temporal-Secret-Key': secret ?? ''
            }
        }));
    }
}