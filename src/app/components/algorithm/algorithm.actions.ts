import { AlgorithmModel } from "./algorithm.model";

export class GetAlgorithms {
    static readonly type = '[Algorithm] Get All';
}

export class SelectAlgorithm {
    static readonly type = '[Algorithm] Select'
    constructor(public algorithm: AlgorithmModel) {}
}

export class GetAlgorithmParameters {
    static readonly type = '[Algorithm] Get Parameters';
    constructor(public algorithm_id: number) {}
}

export class SetAlgorithmParameterValue {
    static readonly type = '[Algorithm] Set Parameter Value';
    constructor(public values: Record<string, any>) {}
}

export class GetUserDatasets {
    static readonly type = '[Dataset] Get By User';
}

export class UploadDataset {
    static readonly type = '[Dataset] Upload Dataset';
    constructor(public file: File) {}
}

export class RunTask {
    static readonly type = '[Task] Run Task';
    constructor(public payload: RunTaskPayload) {}
}

export interface RunTaskPayload {
    algorithm_id: number;
    numeric_values: { parameter_id: number; value: number }[];
    string_values: { parameter_id: number; value: string }[];
}