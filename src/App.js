import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginView from './routes/loginView';
import DashboardView from './routes/dashboardView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/signOutView';
import PublicProfileView from './routes/publicProfileView';
import ChooseUserNameView from './routes/chooseUserNameView';
import './App.css';
import NavBar from "./components/navBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginView />} />
        <Route path='login' element={<LoginView />} />
        <Route path='dashboard' element={<DashboardView />} />
        <Route path='dashboard/profile' element={<EditProfileView />} />
        <Route path='signout' element={<SignOutView />} />
        <Route path='u/:username' element={<PublicProfileView />} />
        <Route path='/choose-username' element={<ChooseUserNameView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
