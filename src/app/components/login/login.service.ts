import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponseModel } from "@components/login/login.model";


@Injectable({
    providedIn: 'root'
})
class LoginService {
    private http = inject(HttpClient);
    private readonly PPML_URL = "http://localhost:7000";
    public login(username: string, password: string): Observable<LoginResponseModel> {
        const url = `${this.PPML_URL}/users/login`;
        const result = this.http.post<LoginResponseModel>(url, { username, password });
        
        return result;
    }

    public async logout(): Promise<void> {
        // Implement your logout logic here, e.g., clear user session or token
    }
}

export { LoginService };