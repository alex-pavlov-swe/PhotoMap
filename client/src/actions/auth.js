import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	FEED_CLEARED,
	UPDATE_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toggleSignIn } from '../firebase/auth';
import { getCurrentProfile } from './profile';

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('api/users', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());

		const body_profile = {
			user: res.data._id,
			name: res.name,
		};

		const res_profile = await axios.post('/api/profile/', body_profile, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res_profile.data,
		});

		dispatch(setAlert('You are now registered and logged in', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser()).then(() => {
			dispatch(getCurrentProfile());
		});
	} catch (error) {
		console.log(error);
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
	try {
		toggleSignIn(email, password);
	} catch (error) {
		console.error(error);
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
	dispatch({
		type: FEED_CLEARED,
	});
};
