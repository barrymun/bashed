import { createContext, useContext, useMemo, useState } from "react";

import { defaultUser } from "utils";

interface SettingsContextProps {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsContext = createContext<SettingsContextProps>({
  user: defaultUser,
  setUser: () => {},
});

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [user, setUser] = useState<string>(defaultUser);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
