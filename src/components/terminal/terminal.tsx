import "./terminal.scss";

import { FC, KeyboardEventHandler, createRef, useEffect, useMemo, useState } from "react";

import { useSettings, useTerminalSession } from "hooks";
import { Command, availableCommands } from "utils";

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const { user } = useSettings();
  const { cwd, commands, setCommands } = useTerminalSession();

  const prefix = useMemo(() => `${user}@localhost:${cwd}$`, [user, cwd]);

  const ref = createRef<HTMLTextAreaElement>();

  const [input, setInput] = useState<string>("");

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
    let output: Command["output"] = null;
    if (input.trim() === "history") {
      output = commands.map((command) => command.input);
    }
    setCommands((prevCommands) => [...prevCommands, { input, output }]);
    setInput("");
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
            <span>{prefix}</span>
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
        <div className="user">{prefix}</div>
        <textarea ref={ref} value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
};

export { Terminal };
