import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AlgorithmService } from "./algorithm.service";
import { GetAlgorithmParameters, GetAlgorithms, SelectAlgorithm } from "./algorithm.actions";
import { AlgorithmModel, AlgorithmParametersModel, AlgorithmStateModel } from "./algorithm.model";
import { tap, catchError, throwError } from "rxjs";

@Injectable()
@State<AlgorithmStateModel>({
    name: 'algorithm',
    defaults: {
        algorithms: [],
        selected: null,
        parameters: null
    }
})
export class AlgorithmState {
    private service = inject(AlgorithmService);

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
        ctx.patchState({ selected: action.algorithm });
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
}