import {RepoInterface} from './repository/RepoInterface';

export class PetsLogic {
    private repo: RepoInterface;
    constructor(repo: RepoInterface) {
        this.repo = repo;
    }
    something(callback: Function) {
        this.repo.something(callback);
    }
}