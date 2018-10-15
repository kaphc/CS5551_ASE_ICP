import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class Privillages {
    getPrivillages() {
        return [
            {"name":"usergroup","set":false,"group":"user","order":1},
            {"name":"user","set":false,"group":"user","order":0},
            {"name":"home","set":false,"group":"home","order":0},
            {"name":"machine","set":false,"group":"machine","order":0},
            {"name":"reasons","set":false,"group":"machine","order":4},
            {"name":"line","set":false,"group":"machine","order":3},
            {"name":"area","set":false,"group":"machine","order":2},
            {"name":"machinegroup","set":false,"group":"machine","order":1},
        ];
    }
}