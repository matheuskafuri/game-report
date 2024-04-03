export class Player {
  name: string;
  kills: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  addKill(): void {
    this.kills++;
  }

  addDeath(): void {
    this.kills--;
  }
}
