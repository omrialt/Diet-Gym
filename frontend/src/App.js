import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import PeoplesPage from "./pages/PepolesPage";
import PeoplePage from "./pages/PeoplePage";
import CreateProgramPage from "./pages/trainings/CreateProgramPage";
import ProgramsPage from "./pages/trainings/ProgramsPage";
import ProgramPage from "./pages/trainings/ProgramPage";
import EditProgramPage from "./pages/trainings/EditProgramPage";
import CreateMenuPage from "./pages/menus/CreateMenuPage";
import MenuPage from "./pages/menus/MenuPage";
import EditMenuPage from "./pages/menus/EditMenuPage";
import MenusPage from "./pages/menus/MenusPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/peoples" element={<PeoplesPage />} />
        <Route path="/profiles/:id" element={<PeoplePage />} />
        <Route path="/programs/create" element={<CreateProgramPage />} />
        <Route path="/programs/:id" element={<ProgramPage />} />
        <Route path="/programs/:id/edit" element={<EditProgramPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/menus/create" element={<CreateMenuPage />} />
        <Route path="/menus/:id" element={<MenuPage />} />
        <Route path="/menus/:id/edit" element={<EditMenuPage />} />
        <Route path="/menus" element={<MenusPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
