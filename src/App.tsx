import { Terminal } from "components";
import { CommandsProvider, SettingsProvider } from "hooks";

function App() {
  return (
    <SettingsProvider>
      <CommandsProvider>
        <Terminal />
      </CommandsProvider>
    </SettingsProvider>
  );
}

export default App;
