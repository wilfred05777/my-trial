import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import Books from "./pages/Books";
import PersonalInformation from "./pages/PersonalInformation";
function App() {
  return (
    <div className="App">
      <main>
        {/* <Router>
          <Routes>
            <Route path="/" exact={<Homepage />} />
          </Routes>
        </Router> */}
        {/* <Homepage />
        <Books /> */}
        <PersonalInformation />
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
