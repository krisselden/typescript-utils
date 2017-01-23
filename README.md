# typescript-utils

Some basic utils for compiling typescript programmatically from node.

```ts
export function getNewLine(): string;
export function getCanonicalFileName(fileName: string): string;
export function formatDiagnostics(diagnostics: ts.Diagnostic[]): string;
export function printDiagnostics(diagnostics: ts.Diagnostic[]): void;
export function parseConfig(fileName: string): ts.ParsedCommandLine;
export function createProgram(config: ts.ParsedCommandLine): ts.Program;
```
