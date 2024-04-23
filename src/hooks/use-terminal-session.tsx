import { createContext, useContext, useMemo, useState } from "react";

import { DirectoryTree } from "lib/directory-structure/directory-tree";
import { Command } from "utils";

interface TerminalSessionContextProps {
  directoryTree: DirectoryTree;
  commands: Command[];
  setDirectoryTree: React.Dispatch<React.SetStateAction<DirectoryTree>>;
  setCommands: React.Dispatch<React.SetStateAction<Command[]>>;
}

interface TerminalSessionProviderProps {
  children: React.ReactNode;
}

const TerminalSessionContext = createContext<TerminalSessionContextProps>({
  directoryTree: {} as DirectoryTree,
  commands: [],
  setDirectoryTree: () => {},
  setCommands: () => {},
});

const TerminalSessionProvider = ({ children }: TerminalSessionProviderProps) => {
  const [directoryTree, setDirectoryTree] = useState<TerminalSessionContextProps["directoryTree"]>(new DirectoryTree());
  const [commands, setCommands] = useState<TerminalSessionContextProps["commands"]>([]);

  const value = useMemo(
    () => ({
      directoryTree,
      commands,
      setDirectoryTree,
      setCommands,
    }),
    [directoryTree, commands, setDirectoryTree, setCommands],
  );

  return <TerminalSessionContext.Provider value={value}>{children}</TerminalSessionContext.Provider>;
};

const useTerminalSession = () => useContext(TerminalSessionContext);

export { TerminalSessionProvider, useTerminalSession };
