import { createStore } from 'redux';
import rootReducer from 'Redux/reducer';

import { RootStore } from 'Redux/reducer';

const store = createStore(rootReducer);

export default store;
export type Store = RootStore;
