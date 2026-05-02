export interface AlgorithmModel {
    algorithm_id: number;
    name: string;
    type: string;
}

export interface NumericParameterModel {
    parameter_id: number;
    name: string;
    type: string;
    default_value: number;
    max_value: number;
}

export interface StringParameterModel {
    parameter_id: number;
    name: string;
    default_value: string;
}

export interface AlgorithmParametersModel {
    algorithm_id: number;
    numeric_parameters: NumericParameterModel[];
    string_parameters: StringParameterModel[];
}

export interface AlgorithmStateModel {
    algorithms: AlgorithmModel[];
    selected: AlgorithmModel | null;
    parameters: AlgorithmParametersModel | null;
    parameterValues: Record<string, any> | null;
}