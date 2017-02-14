import { FixtureResult } from './fixture-result';
export class Fixture {

  private _goalsA: number;
  private _goalsB: number;
  private _teamA: string;
  private _teamB: string;

  public matchNumber: number;
  private _dateEntered: Date;

  public static fromJson(json) {
    return new Fixture(json.teamA, json.teamB,
      json.goalsA == null ? null : Number(json.goalsA),
      json.goalsB == null ? null : Number(json.goalsB),
      json.dateEntered == null ? null : new Date(json.dateEntered));
  }

  public toJsonObject() {
    return {
      teamA: this.teamA,
      teamB: this.teamB,
      goalsA: this.goalsA,
      goalsB: this.goalsB,
      dateEntered: this.dateEntered
    };
  }

  private constructor(teamA: string, teamB: string, goalsA: number, goalsB: number, dateEntered: Date) {
    this._teamA = teamA;
    this._teamB = teamB;
    this._goalsA = goalsA;
    this._goalsB = goalsB;
    this._dateEntered = dateEntered;
  }

  public isComplete() {
    return Number.isInteger(this.goalsA)
      && Number.isInteger(this.goalsB)
      && this.goalsA > -1
      && this.goalsB > -1;
  }

  public getResult(team: string) {
    let teamGoals, otherGoals;
    if (this.teamA === team) {
      teamGoals = this.goalsA;
      otherGoals = this.goalsB;
    } else if (this.teamB === team) {
      teamGoals = this.goalsB;
      otherGoals = this.goalsA;
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

  public set goalsA(value: number) {
    this._goalsA = value;
    this.finalizeMatch();
  }
  public get goalsA() {
    return this._goalsA;
  }

  public set goalsB(value: number) {
    this._goalsB = value;
    this.finalizeMatch();
  }
  public get goalsB() {
    return this._goalsB;
  }

  public get teamA() {
    return this._teamA;
  }
  public get teamB() {
    return this._teamB;
  }
  public get dateEntered() {
    return this._dateEntered;
  }

  public finalizeMatch() {
    if (this.isComplete()) {
      this._dateEntered = new Date();
    } else {
      this._dateEntered = null;
    }
  }
}
