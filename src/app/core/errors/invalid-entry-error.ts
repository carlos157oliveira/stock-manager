export class InvalidEntryError extends Error {

  constructor() {
    super('It wasn\'t found a valid entry for editing!');
  }
}
