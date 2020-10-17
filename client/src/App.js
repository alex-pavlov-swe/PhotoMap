import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
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
import UpdatePhoto from './components/photo/UpdatePhoto';
import Auth from './components/auth/Auth';

// Photomap MAP
import Map from './components/map/Map';
import MapAddPhoto from './components/map/MapAddPhoto';

function App() {
	useEffect(() => {
		store.dispatch(loadUser()).then(() => {
			store.dispatch(getCurrentProfile());
		});
	}, []);

	return (
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
					<Route exact path="/photo/update/:id" component={UpdatePhoto} />
					<Route exact path="/auth" component={Auth} />
					<PrivateRoute exact path="/upload" component={Upload} />
					<PrivateRoute exact path="/uploadDetails" component={UploadDetails} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute
						exact
						path="/update_profile"
						component={UpdateProfile}
					/>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
