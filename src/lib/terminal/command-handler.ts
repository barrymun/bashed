import { DirectoryTree } from "lib/directory-structure";
import { Command, availableCommands } from "utils";

interface CommandHandlerProps {
  prefix: string;
  input: string;
  commands: Command[];
  directoryTree: DirectoryTree;
}

class CommandHandler {
  commands: Command[];

  directoryTree: DirectoryTree;

  output: Command["output"];

  wasCleared: boolean;

  formattedInput: string;

  keywords: string[];

  command: (typeof availableCommands)[number] | null = null;

  constructor({ prefix, input, commands, directoryTree }: CommandHandlerProps) {
    this.extrapolate = this.extrapolate.bind(this);

    this.commands = commands;
    this.directoryTree = directoryTree;
    this.output = null;
    this.wasCleared = false;
    this.formattedInput = `${prefix} ${input}`.trim();
    this.keywords = input.trim().split(" ");
    if (input && this.keywords.length > 0) {
      this.command = this.keywords[0] as (typeof availableCommands)[number];
    }
  }

  public extrapolate() {
    if (!this.command || this.keywords.length === 0) {
      return {
        commands: [...this.commands, { input: this.formattedInput, output: null }],
        directoryTree: this.directoryTree,
      };
    }

    switch (this.command) {
      case "history":
        this.output = this.commands.map((c) => c.input);
        break;
      case "clear":
        this.wasCleared = true;
        this.commands = [{ input: this.formattedInput, output: null }];
        break;
      case "pwd":
        this.output = [this.directoryTree.cwd.name];
        break;
      case "mkdir":
        if (this.keywords.length !== 2) {
          this.output = ["Invalid number of arguments"];
          break;
        }
        this.directoryTree.add(this.keywords[1], this.directoryTree.cwd);
        break;
      case "ls":
        this.output = [
          ...this.directoryTree.cwd.directories.map((d) => d.name),
          ...this.directoryTree.cwd.files.map((f) => f.name),
        ];
        break;
      case "cd":
        switch (this.keywords.length) {
          case 1:
            this.directoryTree.cwd = this.directoryTree.root;
            break;
          case 2:
            // eslint-disable-next-line no-case-declarations
            const newCwd = this.directoryTree.cwd.directories.find((d) => d.name === this.keywords[1]);
            if (!newCwd) {
              this.output = ["Directory not found"];
              break;
            }
            this.directoryTree.cwd = newCwd;
            break;
          default:
            this.output = ["Invalid number of arguments"];
            break;
        }
        break;
      default:
        this.output = ["Command not found"];
        break;
    }
    if (!this.wasCleared) {
      this.commands = [...this.commands, { input: this.formattedInput, output: this.output }];
    }
    return { commands: this.commands, directoryTree: this.directoryTree };
  }
}

export { CommandHandler };
export type { CommandHandlerProps };
