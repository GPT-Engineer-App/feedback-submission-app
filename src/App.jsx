import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import ListEvents from "./pages/ListEvents.jsx";
import CreateDemo from "./pages/CreateDemo.jsx";
import ListDemos from "./pages/ListDemos.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import EditDemo from "./pages/EditDemo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events" element={<ListEvents />} />
        <Route path="/event/:eventId/create-demo" element={<CreateDemo />} />
        <Route path="/event/:eventId/demos" element={<ListDemos />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
        <Route path="/edit-demo/:demoId" element={<EditDemo />} />
      </Routes>
    </Router>
  );
}

export default App;