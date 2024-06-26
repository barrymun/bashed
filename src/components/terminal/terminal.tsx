import "./terminal.scss";

import { FC, KeyboardEventHandler, createRef, useEffect, useMemo, useState } from "react";

import { EditUserDialog } from "components/dialog";
import { useSettings, useTerminalSession } from "hooks";
import { CommandHandler } from "lib/terminal";
import { availableCommands } from "utils";

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const { user } = useSettings();
  const { directoryTree, commands, setDirectoryTree, setCommands } = useTerminalSession();

  const prefix = useMemo(() => `${user}@localhost:${directoryTree.cwd.name}$`, [user, directoryTree.cwd]);

  const ref = createRef<HTMLTextAreaElement>();

  const [input, setInput] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleTab = () => {
    if (input === "") {
      return;
    }
    const formattedText = input.replace(prefix, "");
    for (const availableCommand of availableCommands) {
      if (availableCommand.startsWith(formattedText)) {
        setInput(`${availableCommand} `);
        break;
      }
    }
  };

  const handleEnter: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    event.preventDefault();
    const commandHandler = new CommandHandler({
      prefix,
      input,
      commands,
      directoryTree,
    });
    const response = commandHandler.extrapolate();
    setInput("");
    setCommands(response.commands);
    setDirectoryTree(response.directoryTree);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        handleTab();
        break;
      case "Enter":
        handleEnter(event);
        break;
      default:
        break;
    }
  };

  /**
   * set cursor starting position
   */
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.textIndent = `${prefix.length}ch`; // subtract to account for space chars
  }, [prefix]);

  /**
   * focus on input when component mounts
   */
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.focus();
  }, [ref]);

  return (
    <div className="terminal">
      {commands.map((command, commandIndex) => (
        <div key={commandIndex} className="command">
          <div className="input">
            {/* <span>{prefix}</span> */}
            <span>{command.input}</span>
          </div>
          {command.output && (
            <div className="output">
              {command.output.map((line, lineIndex) => (
                <div key={lineIndex}>{line}</div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="working-area">
        <button type="button" className="user" onClick={() => setIsDialogOpen(true)}>
          {prefix}
        </button>
        <textarea ref={ref} value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
      <EditUserDialog open={isDialogOpen} defaultValue={user} handleClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export { Terminal };
