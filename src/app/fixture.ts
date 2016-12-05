export class Fixture {

  public goalsA: number;
  public goalsB: number;

  constructor(public teamA: string, public teamB: string) {

  }

  public isComplete() {
    return Number.isInteger(this.goalsA)
    && Number.isInteger(this.goalsB)
    && this.goalsA > -1
    && this.goalsB > -1;
  }
}
