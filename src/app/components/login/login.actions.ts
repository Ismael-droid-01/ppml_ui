export class Login {
    static readonly type = '[Login] Login';
    constructor(public username: string, public password: string) {}
}

export class Logout {
    static readonly type = '[Login] Logout';
}