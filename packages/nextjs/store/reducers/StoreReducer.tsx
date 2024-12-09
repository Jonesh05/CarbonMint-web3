import { combineReducers } from '@reduxjs/toolkit';
import { vendorApi } from '~/api/vendor';

const rootReducer = combineReducers({
  [vendorApi.reducerPath]: vendorApi.reducer,
  // Aquí puedes agregar más reducers según necesites
});

export default rootReducer;