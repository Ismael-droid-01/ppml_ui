export interface AlgorithmModel {
    algorithm_id: number;
    name: string;
    type: string;
}

export interface AlgorithmStateModel {
    algorithms: AlgorithmModel[];
    selected: AlgorithmModel | null;
}