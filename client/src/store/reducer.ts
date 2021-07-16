import { combineReducers } from 'redux';
import flashMessage from './reducers/flashMessage';

const reducer = combineReducers({
  flashMessage,
});

export default reducer;
