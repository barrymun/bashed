import "./terminal.scss";

import { FC, KeyboardEventHandler, createRef, useEffect, useMemo, useState } from "react";

import { useSettings } from "hooks";
import { availableCommands } from "utils";

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const { user } = useSettings();

  const prefix = useMemo(() => `${user}@ubuntu:~$ `, [user]);

  const ref = createRef<HTMLTextAreaElement>();

  const [text, setText] = useState<string>("");

  const handleTab = () => {
    if (text === "") {
      return;
    }
    const formattedText = text.replace(prefix, "");
    for (const command of availableCommands) {
      if (command.startsWith(formattedText)) {
        setText(`${command} `);
        break;
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        handleTab();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.textIndent = `${prefix.length}ch`;
  }, [prefix]);

  return (
    <div className="terminal">
      <div className="user">{prefix}</div>
      <textarea ref={ref} value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
};

export { Terminal };
