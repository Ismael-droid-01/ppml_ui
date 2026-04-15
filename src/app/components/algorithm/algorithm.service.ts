import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlgorithmModel } from "./algorithm.model";

@Injectable({ providedIn: 'root' })
export class AlgorithmService {
    private http = inject(HttpClient);
    private CALPULLI_URL = 'http://localhost:7000';

    public getAll(): Observable<AlgorithmModel[]> {
        return this.http.get<AlgorithmModel[]>(`${this.CALPULLI_URL}/algorithms/list`);
    }
}