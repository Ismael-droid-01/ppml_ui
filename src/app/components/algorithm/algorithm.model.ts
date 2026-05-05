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

export interface DatasetModel {
    dataset_id: number;
    name: string;
    extension: string;
}

export interface TaskCreatedResponse {
    task_id: number;
    user_id: number;
    algorithm_id: number;
    response_time: number;
}

export interface AlgorithmStateModel {
    algorithms: AlgorithmModel[];
    selected: AlgorithmModel | null;
    parameters: AlgorithmParametersModel | null;
    parameterValues: Record<string, any> | null;
    datasets: DatasetModel[];
    uploading: boolean;
    uploadError: string | null;
    isRunning: boolean;
    runError: string | null;
    lastTask: TaskCreatedResponse | null;
}