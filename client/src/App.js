import './App.css';
import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Search from './pages/Search';
import OnSearch from './pages/OnSearch';
import Select from './pages/Select';
import OnSelect from './pages/OnSelect';
import Header from './component/Header';
import Store from './Store';
import Init from './pages/Init';
import OnInit from './pages/OnInit';


import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Confirm from './pages/Confirm';
import OnConfirm from './pages/OnConfirm';
import Status from './pages/Status';
import OnStatus from './pages/OnStatus';
import Track from './pages/Track';
import OnTrack from './pages/OnTrack';
import Update from './pages/Update';
import OnUpdate from './pages/OnUpdate';
import Cancel from './pages/Cancel';
import OnCancel from './pages/OnCancel';
import Rating from './pages/Rating';
import OnRating from './pages/OnRating';
import Support from './pages/Support';
import OnSupport from './pages/OnSupport';
import Graph from './pages/Graph';
import CombineCsv from './pages/CombineCsv';

function App() {
  return (
    <Store className="App">
      <Header />
      <Router>
        <div>
          <Routes>
            <Route path="/graph" element={<Graph />} />
            <Route path="/onsupport" element={<OnSupport />} />
            <Route path="/support" element={<Support />} />
            <Route path="/onrating" element={<OnRating />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/oncancel" element={<OnCancel />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/onupdate" element={<OnUpdate />} />
            <Route path="/update" element={<Update />} />
            <Route path="/ontrack" element={<OnTrack />} />
            <Route path="/track" element={<Track />} />
            <Route path="/onstatus" element={<OnStatus />} />
            <Route path="/status" element={<Status />} />
            <Route path="/onconfirm" element={<OnConfirm />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/oninit" element={<OnInit />} /> 
            <Route path="/init" element={<Init />} />
            <Route path="/onselect" element={<OnSelect />} />
            <Route path="/select" element={<Select />} />
            <Route path="/onsearch" element={<OnSearch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/combine" element={<CombineCsv/>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </Store>
  );
}

export default App;
