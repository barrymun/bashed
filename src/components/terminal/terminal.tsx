import "./terminal.scss";

import { FC, KeyboardEventHandler, createRef, useEffect, useMemo, useState } from "react";

import { useCommands, useSettings } from "hooks";
import { availableCommands } from "utils";

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const { user } = useSettings();
  const { commands, setCommands } = useCommands();

  const prefix = useMemo(() => `${user}@ubuntu:~$ `, [user]);

  const ref = createRef<HTMLInputElement>();

  const [text, setText] = useState<string>("");

  const handleTab = () => {
    if (text === "") {
      return;
    }
    const formattedText = text.replace(prefix, "");
    for (const availableCommand of availableCommands) {
      if (availableCommand.startsWith(formattedText)) {
        setText(`${availableCommand} `);
        break;
      }
    }
  };

  const handleEnter = () => {
    setCommands((prevCommands) => [...prevCommands, text]);
    setText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
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
      {commands.map((command, index) => (
        <div key={index} className="command">
          {prefix}
          <span>{command}</span>
        </div>
      ))}
      <div className="user">{prefix}</div>
      <input ref={ref} value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export { Terminal };
