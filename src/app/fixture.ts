import { FixtureResult } from './fixture-result';
export class Fixture {

  private _goalsA: number;
  private _goalsB: number;

  public matchNumber: number;
  public dateEntered: Date;

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
      throw new Error('Team did not play.');
    }

    if (teamGoals > otherGoals) {
      return FixtureResult.Win;
    }
    if (teamGoals < otherGoals) {
      return FixtureResult.Loss;
    }
    return FixtureResult.Draw;
  }

  public static revive(data)

  public set goalsA(value: number) {
    this.goalsA = value;
    this.finalizeMatch();
  }
  public get goalsA() {
    return this._goalsA;
  }

  public set goalsB(value: number) {
    this.goalsB = value;
    this.finalizeMatch();
  }
  public get goalsB() {
    return this._goalsB;
  }

  private finalizeMatch() {
    if (Fixture.isComplete(this)) {
      this.dateEntered = new Date();
    } else {
      this.dateEntered = null;
    }
  }

  constructor(public teamA: string, public teamB: string) {

  }
}
