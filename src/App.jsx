import "./App.css";
import DataGridDisplay from "./components/dataGridDisplay";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
function App() {
  return (
    <>
      <MantineProvider>
        <DataGridDisplay />
      </MantineProvider>
    </>
  );
}

export default App;
