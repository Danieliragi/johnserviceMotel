import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"
import roomsReducer from "./slices/roomsSlice"
import reservationsReducer from "./slices/reservationsSlice"
import { api } from "./api"

// Create a client-side only store
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      rooms: roomsReducer,
      reservations: reservationsReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

// Create store
export const store = makeStore()

// Setup listeners for RTK Query
setupListeners(store.dispatch)
