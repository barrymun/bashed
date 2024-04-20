import { Terminal } from "components";
import { SettingsProvider, TerminalSessionProvider } from "hooks";

function App() {
  return (
    <SettingsProvider>
      <TerminalSessionProvider>
        <Terminal />
      </TerminalSessionProvider>
    </SettingsProvider>
  );
}

export default App;
