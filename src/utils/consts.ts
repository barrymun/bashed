export const defaultUser = "ubuntu";
export const homeDirectory = "~";
export const defaultDirectories = { [homeDirectory]: [] };
export const availableCommands = [
  "cat",
  "less",
  "history",
  "clear",
  "ls",
  "cd",
  "pwd",
  "touch",
  "mkdir",
  "rm",
  "rmdir",
  "mv",
  "cp",
  "whoami",
] as const;
