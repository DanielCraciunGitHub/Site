import { combineReducers } from 'redux';
import { goalSlotsReducer } from './goalSlots';

const rootReducer = combineReducers({
  goalSlots: goalSlotsReducer,
});

export default rootReducer;
