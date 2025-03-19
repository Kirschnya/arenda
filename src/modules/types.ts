export type T_Device = {
    id: string
    name: string
    description: string
    cables: number
    image: string
    video: string
    status: number
    comment?: string
}

export type T_Service = {
    id: string | null
    status: E_ServiceStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    devices: T_Device[]
    tz: string
    date: string
    qr: string
}

export enum E_ServiceStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_ServicesFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_ServiceStatus
    owner: string
}

export type T_DevicesListResponse = {
    devices: T_Device[],
    draft_service_id?: number,
    devices_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_DeviceAddData = {
    name: string;
    description: string;
    cables: number;
    image?: File | null;
    video?: File | null;
}

export type T_DeviceUpdateImageData = {
    image: File;
}