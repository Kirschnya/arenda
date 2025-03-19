import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Device, T_DeviceAddData, T_DevicesListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveService} from "store/slices/servicesSlice.ts";
import {Device} from "src/api/Api.ts";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {CREATE_DEVELOPMENT, FETCH_DEVELOPMENT} from "modules/graphql.ts";

type T_DevicesSlice = {
    device_name: string
    device: null | T_Device
    devices: T_Device[]
}

const initialState:T_DevicesSlice = {
    device_name: "",
    device: null,
    devices: []
}

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

export const fetchDevice = createAsyncThunk<T_Device, string, AsyncThunkConfig>(
    "fetch_device",
    async function(id) {
        const response = await client.query({
            query: FETCH_DEVELOPMENT,
            variables: { "id": parseInt(id) },
        });

        return response.data.device
    }
)

export const fetchDevices = createAsyncThunk<T_Device[], object, AsyncThunkConfig>(
    "fetch_devices",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.devices.devicesList({
            device_name: state.devices.device_name
        }) as AxiosResponse<T_DevicesListResponse>

        thunkAPI.dispatch(saveService({
            draft_service_id: response.data.draft_service_id,
            devices_count: response.data.devices_count
        }))

        return response.data.devices
    }
)

export const addDeviceToService = createAsyncThunk<void, string, AsyncThunkConfig>(
    "devices/add_device_to_service",
    async function(device_id) {
        await api.devices.devicesAddToServiceCreate(device_id)
    }
)

export const deleteDevice = createAsyncThunk<T_Device[], string, AsyncThunkConfig>(
    "delete_device",
    async function(device_id) {
        const response = await api.devices.devicesDeleteDelete(device_id) as AxiosResponse<T_Device[]>
        return response.data
    }
)

export const updateDevice = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_device",
    async function({device_id, data}) {
        await api.devices.devicesUpdateUpdate(device_id as string, data as Device)
    }
)

export const updateDeviceImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_device_image",
    async function({device_id, data}) {
        await api.devices.devicesUpdateImageCreate(device_id as string, data as {image?: File})
    }
)

export const createDevice = createAsyncThunk<void, T_DeviceAddData, AsyncThunkConfig>(
    "update_device",
    async function(formData) {
        const data = Object.fromEntries(formData.entries());
        const response = await client.mutate({
            mutation: CREATE_DEVELOPMENT,
            variables: {
                "name": data.name,
                "description": data.description,
                "cables": parseInt(data.cables as string),
            },
        });
        const service_id = response.data.createDevice.device.id
        await api.devices.devicesUpdateImageCreate(service_id, {image: data.image} as {image?: File})
        await api.devices.devicesUpdateVideoCreate(service_id, {video: data.video} as {video?: File})
    }
)

export const updateDeviceVideo = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_device_video",
    async function({device_id, data}) {
        await api.devices.devicesUpdateVideoCreate(device_id as string, data as {video?: File})
    }
)

const devicesSlice = createSlice({
    name: 'devices',
    initialState: initialState,
    reducers: {
        updateDeviceName: (state, action) => {
            state.device_name = action.payload
        },
        removeSelectedDevice: (state) => {
            state.device = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDevices.fulfilled, (state:T_DevicesSlice, action: PayloadAction<T_Device[]>) => {
            state.devices = action.payload
        });
        builder.addCase(fetchDevice.fulfilled, (state:T_DevicesSlice, action: PayloadAction<T_Device>) => {
            state.device = action.payload
        });
        builder.addCase(deleteDevice.fulfilled, (state:T_DevicesSlice, action: PayloadAction<T_Device[]>) => {
            state.devices = action.payload
        });
    }
})

export const { updateDeviceName, removeSelectedDevice} = devicesSlice.actions;

export default devicesSlice.reducer