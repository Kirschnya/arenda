import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {E_ServiceStatus, T_Service, T_ServicesFilters, T_Device} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_ServicesSlice = {
    draft_service_id: number | null,
    devices_count: number | null,
    service: T_Service | null,
    services: T_Service[],
    filters: T_ServicesFilters,
    save_mm: boolean
}

const initialState:T_ServicesSlice = {
    draft_service_id: null,
    devices_count: null,
    service: null,
    services: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchService = createAsyncThunk<T_Service, string, AsyncThunkConfig>(
    "services/service",
    async function(service_id) {
        const response = await api.services.servicesRead(service_id) as AxiosResponse<T_Service>
        return response.data
    }
)

export const fetchServices = createAsyncThunk<T_Service[], object, AsyncThunkConfig>(
    "services/services",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.services.servicesList({
            status: state.services.filters.status,
            date_formation_start: state.services.filters.date_formation_start,
            date_formation_end: state.services.filters.date_formation_end
        }) as AxiosResponse<T_Service[]>

        return response.data.filter(service => service.owner.includes(state.services.filters.owner))
    }
)

export const removeDeviceFromDraftService = createAsyncThunk<T_Device[], string, AsyncThunkConfig>(
    "services/remove_device",
    async function(device_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.services.servicesDeleteDeviceDelete(state.services.service.id, device_id) as AxiosResponse<T_Device[]>
        return response.data
    }
)

export const deleteDraftService = createAsyncThunk<void, object, AsyncThunkConfig>(
    "services/delete_draft_service",
    async function(_, {getState}) {
        const state = getState()
        await api.services.servicesDeleteDelete(state.services.service.id)
    }
)

export const sendDraftService = createAsyncThunk<void, object, AsyncThunkConfig>(
    "services/send_draft_service",
    async function(_, {getState}) {
        const state = getState()
        await api.services.servicesUpdateStatusUserUpdate(state.services.service.id)
    }
)

export const updateService = createAsyncThunk<void, object, AsyncThunkConfig>(
    "services/update_service",
    async function(data, {getState}) {
        const state = getState()
        await api.services.servicesUpdateUpdate(state.services.service.id, {
            ...data
        })
    }
)

export const updateDeviceValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "services/update_mm_value",
    async function({device_id, comment},thunkAPI) {
        const state = thunkAPI.getState()
        await api.services.servicesUpdateDeviceUpdate(state.services.service.id, device_id, {comment})
    }
)

export const acceptService = createAsyncThunk<void, string, AsyncThunkConfig>(
    "services/accept_service",
    async function(service_id,{dispatch}) {
        await api.services.servicesUpdateStatusAdminUpdate(service_id, {status: E_ServiceStatus.Completed})
        await dispatch(fetchServices)
    }
)

export const rejectService = createAsyncThunk<void, string, AsyncThunkConfig>(
    "services/accept_service",
    async function(service_id,{dispatch}) {
        await api.services.servicesUpdateStatusAdminUpdate(service_id, {status: E_ServiceStatus.Rejected})
        await dispatch(fetchServices)
    }
)

const servicesSlice = createSlice({
    name: 'services',
    initialState: initialState,
    reducers: {
        saveService: (state, action) => {
            state.draft_service_id = action.payload.draft_service_id
            state.devices_count = action.payload.devices_count
        },
        removeService: (state) => {
            state.service = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchService.fulfilled, (state:T_ServicesSlice, action: PayloadAction<T_Service>) => {
            state.service = action.payload
        });
        builder.addCase(fetchServices.fulfilled, (state:T_ServicesSlice, action: PayloadAction<T_Service[]>) => {
            state.services = action.payload
        });
        builder.addCase(removeDeviceFromDraftService.rejected, (state:T_ServicesSlice) => {
            state.service = null
        });
        builder.addCase(removeDeviceFromDraftService.fulfilled, (state:T_ServicesSlice, action: PayloadAction<T_Device[]>) => {
            if (state.service) {
                state.service.devices = action.payload as T_Device[]
            }
        });
        builder.addCase(sendDraftService.fulfilled, (state:T_ServicesSlice) => {
            state.service = null
        });
    }
})

export const { saveService, removeService, triggerUpdateMM, updateFilters } = servicesSlice.actions;

export default servicesSlice.reducer