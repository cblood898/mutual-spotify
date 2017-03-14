import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import flash from './flash';
import spotify from './spotify';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  flash,
  spotify,
});

export default rootReducer;
