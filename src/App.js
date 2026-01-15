import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './Components/Landing/LandingPage';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import LostItemEntry from './Components/ItemComponent/LostItemEntry';
import LostItemReport from './Components/ItemComponent/LostItemReport';
import FoundItemEntry from './Components/ItemComponent/FoundItemEntry';
import FoundItemReport from './Components/ItemComponent/FoundItemReport';
import ChatMessage from "./Components/MessageComponent/ChatMessage"; 
import StudentList from './Components/LoginComponent/StudentList';
import Dummys from './Components/ItemComponent/Dummy';
import MatchItemSearch from "./Components/ItemComponent/MatchItemSearch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/Login' element={<LoginPage/>} />
          <Route path='/Register' element={<RegisterUser/>} />
          <Route path='/AdminMenu' element={<AdminMenu/>} />
          <Route path='/StudentMenu' element={<StudentMenu/>} />
          <Route path='/LostItemEntry' element={<LostItemEntry/>} />
          <Route path='/LostItemReport' element={<LostItemReport/>} />
          <Route path='/FoundItemEntry' element={<FoundItemEntry/>} />
          <Route path='/FoundItemReport' element={<FoundItemReport/>} />
          <Route path='/ChatMessage' element={<ChatMessage/>} />
          <Route path='/StudentList' element={<StudentList/>} />
          <Route path='/Dummy/:pid' element={<Dummys/>} />
          <Route path="/MatchItemSearch/:pid" element={<MatchItemSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;