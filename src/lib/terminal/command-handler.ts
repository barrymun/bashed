import { DirectoryTree } from "lib/directory-structure";
import { Command, availableCommands } from "utils";

export function extrapolate({
  input,
  commands,
  directoryTree,
}: {
  input: string;
  commands: Command[];
  directoryTree: DirectoryTree;
}): {
  output: Command["output"];
  wasCleared: boolean;
  commands: Command[];
  directoryTree: DirectoryTree;
} {
  let output: Command["output"] = null;
  let wasCleared = false;
  let updatedCommands = [...commands];
  let updatedDirectoryTree = directoryTree;

  const keywords = input.trim().split(" ");
  if (keywords.length === 0) {
    return { output, wasCleared, commands: updatedCommands, directoryTree: updatedDirectoryTree };
  }

  const newCwd = directoryTree.cwd.directories.find((d) => d.name === keywords[1]);

  const command = keywords[0] as (typeof availableCommands)[number];
  switch (command) {
    case "history":
      output = commands.map((c) => c.input);
      break;
    case "clear":
      wasCleared = true;
      updatedCommands = [];
      break;
    case "pwd":
      output = [directoryTree.cwd.name];
      break;
    case "mkdir":
      if (keywords.length !== 2) {
        output = ["Invalid number of arguments"];
        break;
      }
      directoryTree.add(keywords[1], directoryTree.cwd);
      updatedDirectoryTree = directoryTree;
      break;
    case "ls":
      output = [...directoryTree.cwd.directories.map((d) => d.name), ...directoryTree.cwd.files.map((f) => f.name)];
      break;
    case "cd":
      if (keywords.length !== 2) {
        output = ["Invalid number of arguments"];
        break;
      }
      if (!newCwd) {
        output = ["Directory not found"];
        break;
      }
      updatedDirectoryTree = { ...directoryTree, cwd: newCwd } as DirectoryTree;
      break;
    default:
      break;
  }
  if (!wasCleared) {
    updatedCommands = [...commands, { input, output }];
  }
  return { output, wasCleared, commands: updatedCommands, directoryTree: updatedDirectoryTree };
  // if (input.trim() === "history") {
  //   output = commands.map((command) => command.input);
  // } else if (input.trim() === "clear") {
  //   wasCleared = true;
  //   setCommands([]);
  // } else if (input.trim() === "pwd") {
  //   output = [directoryTree.cwd.name];
  // } else if (input.trim() === "mkdir") {
  //   directoryTree.add("test", directoryTree.cwd);
  //   setDirectoryTree(directoryTree);
  // } else if (input.trim() === "cd") {
  //   // TODO: need to split the commands into parts
  //   setIsDialogOpen(true);
  // }
  // if (!wasCleared) {
  //   setCommands((prevCommands) => [...prevCommands, { input, output }]);
  // }
}
