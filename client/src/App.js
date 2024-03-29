import { useEffect } from 'react';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/layouts/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProfileForm from './components/profile-form/ProfileForm';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/layouts/NotFound';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); //Why is this here? to load up the user on startup
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
          <Route path="profiles" element={<Profiles />} />
          <Route path="profile/:id" element={<Profile />} />
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
          <Route path="posts" element={<PrivateRoute component={Posts} />} />
          <Route path="post/:id" element={<PrivateRoute component={Post} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
