import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import flash from './flash';
import spotify from './spotify';
import cplists from './cplists';
import remember from './remember';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  flash,
  spotify,
  cplists,
  remember,
});

export default rootReducer;
