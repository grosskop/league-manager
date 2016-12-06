export class Fixture {

  public goalsA: number;
  public goalsB: number;
  public matchNumber: number;

  public static isComplete(fix: Fixture) {
    return Number.isInteger(fix.goalsA)
    && Number.isInteger(fix.goalsB)
    && fix.goalsA > -1
    && fix.goalsB > -1;
  }

  constructor(public teamA: string, public teamB: string) {

  }
}
