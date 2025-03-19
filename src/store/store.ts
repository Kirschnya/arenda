import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import servicesReducer from "./slices/servicesSlice.ts"
import devicesReducer from "./slices/devicesSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        services: servicesReducer,
        devices: devicesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;