import { combineReducers } from 'redux-immutablejs';

import userDataReducer from './user.reducer';
import pageDataReducer from './pageData.reducer';

const rootReducer = combineReducers({
    pageData: pageDataReducer,
    userData: userDataReducer,
});

export default rootReducer;
