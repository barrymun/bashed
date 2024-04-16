import { Terminal } from "components";
import { SettingsProvider } from "hooks";

function App() {
  return (
    <SettingsProvider>
      <Terminal />
    </SettingsProvider>
  );
}

export default App;
