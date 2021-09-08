import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./pages/Create";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/Detail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Error from "./components/Error";
import { PrivateRoute } from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import { UserProvider } from "./context/UserContext";
import AccountSettings from "./pages/Account/Settings";
import Forgot from "./pages/Login/Forgot";

function App() {
    return (
        <Router>
            <UserProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/blog">
                        <Blog />
                    </Route>
                    <PrivateRoute path="/create">
                        <Create />
                    </PrivateRoute>
                    <Route path="/post/:id">
                        <BlogDetail />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/forgot">
                        <Forgot />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/profile/:user_id">
                        <Profile />
                    </Route>
                    <Route exact path="/account">
                        <Account />
                    </Route>
                    <Route path="/account/settings">
                        <AccountSettings />
                    </Route>
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
            </UserProvider>
        </Router>
    );
}

export default App;
