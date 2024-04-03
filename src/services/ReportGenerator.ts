import { Report } from "../dto/report.dto";
import { Match } from "../entities/Match";

export class ReportGenerator {
  generateReport(matches: Match[]): void {
    const report: Report = {};

    matches.forEach((match, index) => {
      const gameKey = `game_${index + 1}`;
      report[gameKey] = {
        total_kills: match.totalKills,
        players: match.getPlayersList(),
        kills: match.getKills(),
        kills_by_means: match.getKillsByMeans(),
      };
    });

    console.log(JSON.stringify(report, null, 2));
  }
}
