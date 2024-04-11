export class UserAlreadyExistsError extends Error {
  constructor(nickname: string) {
    super(`User ${nickname} already exists.`);
  }
}
