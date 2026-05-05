import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlgorithmModel, AlgorithmParametersModel, DatasetModel, TaskCreatedResponse } from "./algorithm.model";
import { RunTaskPayload } from "./algorithm.actions";

@Injectable({ providedIn: 'root' })
export class AlgorithmService {
    private http = inject(HttpClient);
    private CALPULLI_URL = 'http://localhost:7000';

    public getAll(): Observable<AlgorithmModel[]> {
        return this.http.get<AlgorithmModel[]>(`${this.CALPULLI_URL}/algorithms/list`);
    }

    public getParameters(algorithm_id: number): Observable<AlgorithmParametersModel> {
        return this.http.get<AlgorithmParametersModel>(
            `${this.CALPULLI_URL}/algorithms/${algorithm_id}/parameters`
        );
    }

    public getUserDatasets(): Observable<any> {
        return this.http.get(`${this.CALPULLI_URL}/datasets`);
    }

    public uploadDataset(file: File): Observable<DatasetModel> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<DatasetModel>(`${this.CALPULLI_URL}/datasets`, formData);
    }

    public runTask(payload: RunTaskPayload): Observable<TaskCreatedResponse> {
        return this.http.post<TaskCreatedResponse>(`${this.CALPULLI_URL}/tasks/run`, payload);
    }
}