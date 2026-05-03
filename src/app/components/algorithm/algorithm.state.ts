import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap, throwError } from "rxjs";
import { GetAlgorithmParameters, GetAlgorithms, GetUserDatasets, SelectAlgorithm } from "./algorithm.actions";
import { AlgorithmModel, AlgorithmParametersModel, AlgorithmStateModel, DatasetModel } from "./algorithm.model";
import { AlgorithmService } from "./algorithm.service";

@Injectable()
@State<AlgorithmStateModel>({
    name: 'algorithm',
    defaults: {
        algorithms: [],
        selected: null,
        parameters: null,
        parameterValues: null,
        datasets: []
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
}