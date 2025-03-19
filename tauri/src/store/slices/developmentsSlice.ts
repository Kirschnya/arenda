import {createSlice} from "@reduxjs/toolkit";

type T_DevicesSlice = {
    device_name: string
}

const initialState:T_DevicesSlice = {
    device_name: "",
}


const devicesSlice = createSlice({
    name: 'devices',
    initialState: initialState,
    reducers: {
        updateDeviceName: (state, action) => {
            state.device_name = action.payload
        }
    }
})

export const { updateDeviceName} = devicesSlice.actions;

export default devicesSlice.reducer