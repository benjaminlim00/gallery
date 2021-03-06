import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const App: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};
