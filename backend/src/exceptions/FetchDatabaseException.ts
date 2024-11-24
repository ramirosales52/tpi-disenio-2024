export class FetchDatabaseException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FetchDatabaseException'
  }
}
