import React, { Fragment, useEffect } from 'react';
// import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import HomeMobile from './components/layout/HomeMobile';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import UpdateProfile from './components/profile-forms/UpdateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Review from './components/reviews/Review';
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { getCurrentProfile } from './actions/profile';

// Photomap
import Upload from './components/upload/Upload';
import UploadDetails from './components/upload/UploadDetails';
import Feed from './components/feed/Feed';
import FeedCl from './components/feed/FeedCl';
import UpdatePhoto from './components/photo/UpdatePhoto';
import Auth from './components/auth/Auth';
import Navbar from './components/layout/Navbar';
import AboutPage from './components/about/AboutPage';

// Photomap MAP
import Map from './components/map/Map';
import MapAddPhoto from './components/map/MapAddPhoto';

import useWindowDimensions from './components/helpers/hooks';

function App() {
    useEffect(() => {
        store.dispatch(loadUser()).then(() => {
            store.dispatch(getCurrentProfile());
        });
    }, []);

    const { windowWidth } = useWindowDimensions();

    return windowWidth > 575 ? (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Alert />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/profile/review/:id" component={Review} />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/mapAddPhoto" component={MapAddPhoto} />
                    <Route exact path="/feed" component={Feed} />
                    <Route exact path="/feedCl" component={FeedCl} />
                    <PrivateRoute exact path="/photo/update/:id" component={UpdatePhoto} />
                    <Route exact path="/auth" component={Auth} />
                    <PrivateRoute exact path="/upload" component={Upload} />
                    <PrivateRoute exact path="/uploadDetails" component={UploadDetails} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/about" component={AboutPage} />
                    <PrivateRoute
                        exact
                        path="/update_profile"
                        component={UpdateProfile}
                    />
                </Switch>
            </Router>
        </Provider>
    ) : (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Route exact path="/" component={HomeMobile} />
            </Router>
        </Provider>
    );
}

export default App;
