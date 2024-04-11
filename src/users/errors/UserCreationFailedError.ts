export class UserCreationFailedError extends Error {
    constructor(nickname) {
        super(`The creation of user ${nickname} failed.`)
    }
}
