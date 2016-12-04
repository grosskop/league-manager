export class TableEntry {
  constructor(public playerName: string,
              public wins: number,
              public draws: number,
              public losses: number,
              public goalsScored: number,
              public goalsConceived: number) { }

  public get goalDifference() {
    return this.goalsScored - this.goalsConceived;
  }

  public get points() {
    return this.wins * 3 + this.draws;
  }
}
