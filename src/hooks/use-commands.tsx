import { createContext, useContext, useMemo, useState } from "react";

import { Command } from "utils";

interface CommandsContextProps {
  commands: Command[];
  setCommands: React.Dispatch<React.SetStateAction<Command[]>>;
}

interface CommandsProviderProps {
  children: React.ReactNode;
}

const CommandsContext = createContext<CommandsContextProps>({
  commands: [],
  setCommands: () => {},
});

const CommandsProvider = ({ children }: CommandsProviderProps) => {
  const [commands, setCommands] = useState<Command[]>([]);

  const value = useMemo(
    () => ({
      commands,
      setCommands,
    }),
    [commands, setCommands],
  );

  return <CommandsContext.Provider value={value}>{children}</CommandsContext.Provider>;
};

const useCommands = () => useContext(CommandsContext);

export { CommandsProvider, useCommands };
