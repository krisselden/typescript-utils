import * as ts from "typescript";
import { sep } from "path";

const { sys } = ts;
const { useCaseSensitiveFileNames, newLine, getCurrentDirectory } = sys;

export function getNewLine() {
  return newLine;
}

export function getCanonicalFileName(fileName: string) {
  return useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
}

const formatDiagnosticsHost: ts.FormatDiagnosticsHost = {
  getCurrentDirectory,
  getCanonicalFileName,
  getNewLine
};

export function formatDiagnostics(diagnostics: ts.Diagnostic[]): string {
  return ts.formatDiagnostics(diagnostics, formatDiagnosticsHost);
}

export function printDiagnostics(diagnostics: ts.Diagnostic[]): void {
  sys.write(formatDiagnostics(diagnostics));
}

export function parseConfig(fileName: string): ts.ParsedCommandLine {
  let configFileName = sys.resolvePath(fileName);
  let result = ts.readConfigFile(configFileName, sys.readFile);
  if (result.error) {
    return {
      errors: [result.error],
      options: {},
      fileNames: []
    };
  }
  let configDir = configFileName.substr(0, configFileName.lastIndexOf(sep));
  return ts.parseJsonConfigFileContent(result.config, sys, configDir, undefined, configFileName);
}

export function createProgram(config: ts.ParsedCommandLine) {
  return ts.createProgram(config.fileNames, config.options);
}
