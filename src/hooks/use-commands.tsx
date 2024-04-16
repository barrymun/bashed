import { createContext, useContext, useMemo, useState } from "react";

interface CommandsContextProps {
  commands: string[];
  setCommands: React.Dispatch<React.SetStateAction<string[]>>;
}

interface CommandsProviderProps {
  children: React.ReactNode;
}

const CommandsContext = createContext<CommandsContextProps>({
  commands: [],
  setCommands: () => {},
});

const CommandsProvider = ({ children }: CommandsProviderProps) => {
  const [commands, setCommands] = useState<string[]>([]);

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
