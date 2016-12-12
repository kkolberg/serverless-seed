import {RepoInterface} from './repository/repointerface';

export class PetsLogic {
    private repo: any;
    constructor(repo: any) {
        this.repo = repo;
    }
    something(callback: Function) {
        this.repo.something(callback);
    }
}