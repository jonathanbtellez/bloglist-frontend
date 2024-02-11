import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { NotificationContextProvider } from "./context/NotificationContext";
import { UserContextProvider } from "./context/UserContext";
import { UsersContextProvider } from "./context/UsersContext";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <UsersContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </UsersContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
);
