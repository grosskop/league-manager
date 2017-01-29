import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() { }

    login(username: string, password: string) {
        throw new Error('Not implemented');
    }
}
