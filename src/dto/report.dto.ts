import { GameReport } from "./game-report.dto";

export interface Report {
  [gameKey: string]: GameReport;
}