import { combineReducers } from 'redux';
import authReducer from './authReducer';
import organizationReducer from './organizationReducer';
import customerReducer from './customerReducer';
import homeReducer from './homeReducer';
import jobAndEventReducer from './jobAndEventReducer';
import profileReducer from './profileReducer';
import promotionReducer from './promotionReducer';
const reducers = combineReducers({
  auth: authReducer,
  organization: organizationReducer,
  customer: customerReducer,
  home: homeReducer,
  jobAndEvent: jobAndEventReducer,
  profile: profileReducer,
  promotion: promotionReducer
});
export default reducers;
