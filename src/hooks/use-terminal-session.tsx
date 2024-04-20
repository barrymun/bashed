import { createContext, useContext, useMemo, useState } from "react";

import { Command, defaultDirectories, homeDirectory } from "utils";

interface TerminalSessionContextProps {
  directories: Record<string, string[]>;
  cwd: keyof TerminalSessionContextProps["directories"];
  commands: Command[];
  setCommands: React.Dispatch<React.SetStateAction<Command[]>>;
}

interface TerminalSessionProviderProps {
  children: React.ReactNode;
}

const TerminalSessionContext = createContext<TerminalSessionContextProps>({
  directories: defaultDirectories,
  cwd: homeDirectory,
  commands: [],
  setCommands: () => {},
});

const TerminalSessionProvider = ({ children }: TerminalSessionProviderProps) => {
  const [directories, setDirectories] = useState<TerminalSessionContextProps["directories"]>(defaultDirectories);
  const [cwd, setCwd] = useState<TerminalSessionContextProps["cwd"]>(homeDirectory);
  const [commands, setCommands] = useState<TerminalSessionContextProps["commands"]>([]);

  const value = useMemo(
    () => ({
      directories,
      cwd,
      commands,
      setDirectories,
      setCwd,
      setCommands,
    }),
    [directories, cwd, commands, setDirectories, setCwd, setCommands],
  );

  return <TerminalSessionContext.Provider value={value}>{children}</TerminalSessionContext.Provider>;
};

const useTerminalSession = () => useContext(TerminalSessionContext);

export { TerminalSessionProvider, useTerminalSession };
