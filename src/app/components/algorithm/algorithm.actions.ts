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