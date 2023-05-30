export class Country {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class State {
  id: number;
  name: string;
  countryId: number;

  constructor(id: number, name: string, countryId: number) {
    this.id = id;
    this.name = name;
    this.countryId = countryId;
  }
}

export class City {
  id: number;
  name: string;
  stateId: number;

  constructor(id: number, name: string, stateId: number) {
    this.id = id;
    this.name = name;
    this.stateId = stateId;
  }
}
