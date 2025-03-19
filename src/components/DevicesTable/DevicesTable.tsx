import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Device} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteDevice} from "store/slices/devicesSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    devices:T_Device[]
}

const DevicesTable = ({devices}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (device_id) => {
        navigate(`/devices/${device_id}`)
    }

    const openDeviceEditPage = (device_id) => {
        navigate(`/devices/${device_id}/edit`)
    }

    const handleDeleteDevice = async (device_id) => {
        dispatch(deleteDevice(device_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({cell}) => <img src={`/api/devices/${cell.row?.original.id}/image`} width={100}/>
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Кабели',
                accessor: 'cables',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openDeviceEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteDevice(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!devices.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={devices} onClick={handleClick} />
    )
};

export default DevicesTable