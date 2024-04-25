import { DirectoryTree } from "lib/directory-structure";
import { Command, availableCommands } from "utils";

// interface InputProps {
//   input: string;
//   commands: Command[];
//   directoryTree: DirectoryTree;
// }

// interface ReturnProps {
//   output: Command["output"];
//   wasCleared: boolean;
//   commands: Command[];
//   directoryTree: DirectoryTree;
// }

export function extrapolate({
  prefix,
  input,
  commands,
  directoryTree,
}: {
  prefix: string;
  input: string;
  commands: Command[];
  directoryTree: DirectoryTree;
}): {
  commands: Command[];
  directoryTree: DirectoryTree;
} {
  const formattedInput = `${prefix} ${input}`.trim();
  let output: Command["output"] = null;
  let wasCleared = false;
  let updatedCommands = [...commands, { input: formattedInput, output: null }];
  const updatedDirectoryTree = directoryTree;

  const keywords = input.trim().split(" ");
  if (keywords.length === 0) {
    return { commands: updatedCommands, directoryTree: updatedDirectoryTree };
  }

  const command = keywords[0] as (typeof availableCommands)[number];
  switch (command) {
    case "history":
      output = commands.map((c) => c.input);
      break;
    case "clear":
      wasCleared = true;
      updatedCommands = [{ input: formattedInput, output: null }];
      break;
    case "pwd":
      output = [directoryTree.cwd.name];
      break;
    case "mkdir":
      if (keywords.length !== 2) {
        output = ["Invalid number of arguments"];
        break;
      }
      updatedDirectoryTree.add(keywords[1], directoryTree.cwd);
      break;
    case "ls":
      output = [...directoryTree.cwd.directories.map((d) => d.name), ...directoryTree.cwd.files.map((f) => f.name)];
      break;
    case "cd":
      switch (keywords.length) {
        case 1:
          updatedDirectoryTree.cwd = directoryTree.root;
          break;
        case 2:
          // eslint-disable-next-line no-case-declarations
          const newCwd = directoryTree.cwd.directories.find((d) => d.name === keywords[1]);
          if (!newCwd) {
            output = ["Directory not found"];
            break;
          }
          updatedDirectoryTree.cwd = newCwd;
          break;
        default:
          output = ["Invalid number of arguments"];
          break;
      }
      break;
    default:
      output = ["Command not found"];
      break;
  }
  if (!wasCleared) {
    updatedCommands = [...commands, { input: formattedInput, output }];
  }
  return { commands: updatedCommands, directoryTree: updatedDirectoryTree };
}
