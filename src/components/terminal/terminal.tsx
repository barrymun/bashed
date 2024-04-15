import "./terminal.scss";

import { FC, KeyboardEventHandler, createRef, useState } from "react";

import { availableCommands } from "utils/consts";

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const ref = createRef<HTMLTextAreaElement>();

  const [input, setValue] = useState<string>("");

  const handleTab = () => {
    if (input === "") {
      return;
    }
    for (const command of availableCommands) {
      if (command.startsWith(input)) {
        setValue(`${command} `);
        break;
      }
    }
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

  return (
    <div className="terminal">
      <textarea ref={ref} value={input} onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} />
    </div>
  );
};

export { Terminal };
