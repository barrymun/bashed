import "./terminal.scss";

import { FC, KeyboardEventHandler, createRef, useEffect, useMemo, useState } from "react";

import { useCommands, useSettings } from "hooks";
import { Command, availableCommands } from "utils";

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const { user } = useSettings();
  const { commands, setCommands } = useCommands();

  const prefix = useMemo(() => `${user}@ubuntu:~$ `, [user]);

  const ref = createRef<HTMLInputElement>();

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

  const handleEnter = () => {
    let output: Command["output"] = null;
    if (input === "history") {
      output = commands.map((command) => command.input);
    }
    setCommands((prevCommands) => [...prevCommands, { input, output }]);
    setInput("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        handleTab();
        break;
      case "Enter":
        handleEnter();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.textIndent = `${prefix.length + 2}ch`;
  }, [prefix]);

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
      <div className="user">{prefix}</div>
      <input ref={ref} value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export { Terminal };
