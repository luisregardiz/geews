import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./pages/Create";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";

function App() {
    return (
        <Router>
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
                    <BlogDetail/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
