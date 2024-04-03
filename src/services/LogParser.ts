import { Match } from "../entities/Match";

export class LogParser {
  parseLog(logContent: string): Match[] {
    const lines = logContent.split('\n');
    const matches: Match[] = [];
    let currentMatch: Match | null = null;

    for (const line of lines) {
      if (line.includes('InitGame:')) {
        if (currentMatch) {
          matches.push(currentMatch);
        }
        currentMatch = new Match();
      } else if (line.includes('ClientUserinfoChanged:')) {
        const parts = line.split('\\');
        const playerName = parts[1];
        if (playerName) {
          currentMatch?.addPlayer(playerName);
        }
      } else if (line.includes('Kill:')) {
        const parts = line.split(': ');
        const killInfo = parts[2].split(' killed ');
        const killer = killInfo[0]; // Extracts the killer's name
        const victim = killInfo[1].split(' by ')[0]; // Extracts the victim's name
        const mean = killInfo[1].split(' by ')[1]; // Extracts the mean of the kill
        if (killer && victim && mean) {
          currentMatch?.addKill(killer, victim, mean);
        }
      } else if (line.includes('ShutdownGame:') || line.includes('Exit: Timelimit hit.')) {
        if (currentMatch) {
          matches.push(currentMatch);
          currentMatch = null;
        }
      }
    }

    if (currentMatch) {
      matches.push(currentMatch);
    }

    return matches;
  }
}
