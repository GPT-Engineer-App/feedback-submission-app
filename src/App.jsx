import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import EventList from "./pages/EventList.jsx";
import CreateDemo from "./pages/CreateDemo.jsx";
import DemoList from "./pages/DemoList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:eventId/create-demo" element={<CreateDemo />} />
        <Route path="/events/:eventId/demos" element={<DemoList />} />
      </Routes>
    </Router>
  );
}

export default App;
