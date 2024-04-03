import { KillByMeans } from "./kill-by-means.dto";
import { PlayerKills } from "./player-kills.dto";

export interface GameReport {
  total_kills: number;
  players: string[];
  kills: PlayerKills;
  kills_by_means: KillByMeans;
}
