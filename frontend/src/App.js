import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IncidentList from "./pages/IncidentList";
import IncidentDetail from "./pages/IncidentDetail";
import CreateIncident from "./pages/CreateIncident";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
        <Route path="/create" element={<CreateIncident />} />
      </Routes>
    </Router>
  );
}

export default App;
