import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap, throwError } from "rxjs";
import { GetAlgorithmParameters, GetAlgorithms, GetUserDatasets, RunTask, SelectAlgorithm, UploadDataset } from "./algorithm.actions";
import { AlgorithmModel, AlgorithmParametersModel, AlgorithmStateModel, DatasetModel, TaskCreatedResponse } from "./algorithm.model";
import { AlgorithmService } from "./algorithm.service";

@Injectable()
@State<AlgorithmStateModel>({
    name: 'algorithm',
    defaults: {
        algorithms: [],
        selected: null,
        parameters: null,
        parameterValues: null,
        datasets: [],
        uploading: false,
        uploadError: null,
        isRunning: false,
        runError: null,
        lastTask: null
    }
})
export class AlgorithmState {
    private service = inject(AlgorithmService);

    @Selector()
    static algorithms(state: AlgorithmStateModel) {
        return state.algorithms;
    }
    
    @Selector()
    static parameters(state: AlgorithmStateModel) {
        return state.parameters;
    }

    @Selector()
    static parameterValues(state: AlgorithmStateModel) {   
        return state.parameterValues;
    }

    @Selector()
    static datasets(state: AlgorithmStateModel) {
        return state.datasets;
    }

    @Selector()
    static uploading(state: AlgorithmStateModel) {
        return state.uploading;
    }

    @Selector()
    static uploadError(state: AlgorithmStateModel) {
        return state.uploadError;
    }

    @Selector()
    static isRunning(state: AlgorithmStateModel) {
        return state.isRunning;
    }

    @Selector()
    static runError(state: AlgorithmStateModel) {
        return state.runError;
    }

    @Selector()
    static lastTask(state: AlgorithmStateModel) {
        return state.lastTask;
    }

    @Action(GetAlgorithms)
    getAlgorithms(ctx: StateContext<AlgorithmStateModel>) {
        return this.service.getAll().pipe(
            tap((algorithms: AlgorithmModel[]) => {
                ctx.patchState({ algorithms });
            }),
            catchError(error => {
                console.error('Failed to fetch algorithms:', error);
                return throwError(() => error);
            })
        );
    }

    @Action(SelectAlgorithm)
    selectAlgorithm(ctx: StateContext<AlgorithmStateModel>, action: SelectAlgorithm) {
        ctx.patchState({ selected: action.algorithm, parameters: null, parameterValues: null });
    }

    @Action(GetAlgorithmParameters)
    getParameters(ctx: StateContext<AlgorithmStateModel>, action: GetAlgorithmParameters) {
        return this.service.getParameters(action.algorithm_id).pipe(
            tap((parameters: AlgorithmParametersModel) => {
                ctx.patchState({ parameters });
            }),
            catchError(error => {
                console.error('Failed to fetch algorithm parameters:', error);
                return throwError(() => error);
            })
        );
    }

    @Action(GetUserDatasets)
    getUserDatasets(ctx: StateContext<AlgorithmStateModel>) {
        return this.service.getUserDatasets().pipe(
            tap((datasets: DatasetModel[]) =>  ctx.patchState({ datasets})),
            catchError(error => {
                console.error('Failed to fetch user datasets:', error);
                return throwError(() => error);
            })
        );
    }

    @Action(UploadDataset)
    uploadDataset(ctx: StateContext<AlgorithmStateModel>, action: UploadDataset) {
        ctx.patchState({ uploading: true, uploadError: null });

        return this.service.uploadDataset(action.file).pipe(
            tap((newDataset: DatasetModel) => {
                const current = ctx.getState().datasets;
                ctx.patchState({
                    datasets: [...current, newDataset],
                    uploading: false,
                    uploadError: null
                });
            }),
            catchError(error => {
                ctx.patchState({
                    uploading: false,
                    uploadError: error?.error?.detail ?? 'Upload failed'
                });
                return throwError(() => error);
            })
        );
    }

    @Action(RunTask)
    runTask(ctx: StateContext<AlgorithmStateModel>, action: RunTask) {
        ctx.patchState({ isRunning: true, runError: null, lastTask: null });
        return this.service.runTask(action.payload).pipe(
            tap((task: TaskCreatedResponse) => {
                ctx.patchState({ isRunning: false, lastTask: task });
            }),
            catchError(error => {
                const message = error?.error?.detail ?? 'Unexpected error, please try again.';
                ctx.patchState({ isRunning: false, runError: message });
                return throwError(() => error);
            })
        );
    }
}