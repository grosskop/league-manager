import {FixtureResult} from "./fixture-result";
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

  public static getResult(fix: Fixture, team: string) {
    let teamGoals, otherGoals;
    if (fix.teamA === team) {
      teamGoals = fix.goalsA;
      otherGoals = fix.goalsB;
    } else if (fix.teamB === team) {
      teamGoals = fix.goalsB;
      otherGoals = fix.goalsA;
    } else {
      throw new Error('Team did not play.')
    }

    if (teamGoals > otherGoals)
      return FixtureResult.Win;
    if (teamGoals < otherGoals)
      return FixtureResult.Loss;
    return FixtureResult.Draw;
  }

  constructor(public teamA: string, public teamB: string) {

  }
}
