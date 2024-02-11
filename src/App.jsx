import { Route, Routes, useParams } from "react-router-dom";

import Login from "./components/Login";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";

import { useUserValue } from "./context/UserContext";
import BlogsView from "./views/BlogsView";
import UsersView from "./views/UsersView,jsx";
import UserInfo from "./components/UserInfo";

const App = () => {
  const user = useUserValue();

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <>
          <NavBar />
          <Notification />
          <Routes>
            <Route path="/" element={<BlogsView />}></Route>
            <Route path="/users" element={<UsersView />}>
              <Route path="/users/:id" element={<UserInfo />} />
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
