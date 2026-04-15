import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AlgorithmService } from "./algorithm.service";
import { GetAlgorithms, SelectAlgorithm } from "./algorithm.actions";
import { AlgorithmModel, AlgorithmStateModel } from "./algorithm.model";
import { tap, catchError, throwError } from "rxjs";

@Injectable()
@State<AlgorithmStateModel>({
    name: 'algorithm',
    defaults: {
        algorithms: [],
        selected: null
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
}