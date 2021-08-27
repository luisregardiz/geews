import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./pages/Create";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/Detail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import Error from "./components/Error";

function App() {
    return (
        <UserProvider>
            <Router>
                <Toaster position="top-center" reverseOrder={false} />
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/blog">
                        <Blog />
                    </Route>
                    <Route path="/create">
                        <Create />
                    </Route>
                    <Route path="/blog/:id">
                        <BlogDetail />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
            </Router>
        </UserProvider>
    );
}

export default App;
