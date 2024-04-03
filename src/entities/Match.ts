import { Player } from "./Player";
import { KillByMeans } from "../dto/kill-by-means.dto";

export class Match {
  totalKills: number = 0;
  players: Map<string, Player> = new Map();
  killByMeans: KillByMeans = {};

  constructor() {}

  addPlayer(name: string): Player {
    if (!this.players.has(name)) {
      const player = new Player(name);
      this.players.set(name, player);
      return player;
    }
    return this.players.get(name)!;
  }

  addKill(killerName: string, victimName: string, mean: string): void {
    this.totalKills++;
    if (killerName !== '<world>') {
      const killer = this.players.get(killerName) || this.addPlayer(killerName);
      killer.addKill();
    } else {
      // When <world> is the killer, decrement the victim's kill count
      const victim = this.addPlayer(victimName);
      victim.addDeath();
    }

    if (mean) {
      if (!this.killByMeans[mean]) {
        this.killByMeans[mean] = 1;
      } else {
        this.killByMeans[mean]++;
      }
    }
  }

  getPlayersList(): string[] {
    return Array.from(this.players.values()).map(player => player.name);
  }

  getKills(): { [playerName: string]: number } {
    const kills: { [playerName: string]: number } = {};
    this.players.forEach((player, name) => {
      kills[name] = player.kills;
    });
    return kills;
  }

  getKillsByMeans(): { [mean: string]: number } {
    return this.killByMeans;
  }
}
