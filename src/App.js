import "bootstrap/dist/css/bootstrap.min.css";
import Task from "./components/Task";
import User from "./components/User";
import { AppProvider } from "./Context/AppContext";


function App() {
  return (
    <div className="App px-5">
      <AppProvider>
        <User/>
        <Task/>
      </AppProvider>
    </div>
  );
}

export default App;
