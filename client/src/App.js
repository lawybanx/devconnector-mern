import { useEffect } from 'react';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/layouts/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProfileForm from './components/profile-form/ProfileForm';
import Profiles from './components/profiles/Profiles';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { getProfiles } from './actions/profileActions';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); //Why is this here? to load up the user on startup
    store.dispatch(getProfiles());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route path="profiles" element={<Profiles />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
