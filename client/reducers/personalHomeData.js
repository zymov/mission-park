import {createReducer} from '../../utils';
import {RECEIVE_PERSONAL_HOME_DATA, FETCH_PERSONAL_HOME_DATA_REQUEST} from '../constants';

const initialState = {
    data: null,
    isFetching: false
};

export default createReducer(initialState, {
	[RECEIVE_PERSONAL_HOME_DATA]: (state, payload) => {
		return Object.assign({}, state, {
			'data': payload.data,
			'isFetching': false
		});
	},
	[FETCH_PERSONAL_HOME_DATA_REQUEST]: (state, payload) => {
		return Object.assign({}, state, {
			'isFetching': true
		});
	}
});

