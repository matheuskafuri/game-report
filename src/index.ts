import { LogParser } from "./services/LogParser";
import { ReportGenerator } from "./services/ReportGenerator";
import * as fs from "fs";

const logContent = fs.readFileSync('games.log', 'utf8');

const logParser = new LogParser();
const matchesData = logParser.parseLog(logContent);

const reportGenerator = new ReportGenerator();
reportGenerator.generateReport(matchesData);