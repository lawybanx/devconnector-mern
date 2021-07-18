import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
