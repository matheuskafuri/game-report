import * as fs from 'fs';
import { LogParser } from '../src/services/LogParser';

describe('LogParser', () => {
  it('should parse a log file correctly', () => {
    const logContent = fs.readFileSync('test.log', 'utf8');
    const logParser = new LogParser();
    const matches = logParser.parseLog(logContent);

    expect(matches.length).toBe(3); // Assuming there are 3 games in the log
    expect(matches[0].players.size).toBe(0); // Assuming 0 players in the first game
    expect(matches[1].players.size).toBe(3); // Assuming 3 players in the second game
    expect(matches[2].totalKills).toBe(4); // Assuming 4 total kills in the third game
    expect(matches[2].killByMeans['MOD_ROCKET']).toBe(1); // Assuming 1 kill by MOD_ROCKET in the third game
  });
});
