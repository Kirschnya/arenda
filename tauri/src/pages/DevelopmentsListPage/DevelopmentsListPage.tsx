import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import DeviceCard from "components/DeviceCard/DeviceCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateDeviceName} from "src/store/slices/devicesSlice.ts";
import {T_Device} from "modules/types.ts";
import {DeviceMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"
import {isTauri} from "@tauri-apps/api/core";

type Props = {
    devices: T_Device[],
    setDevices: React.Dispatch<React.SetStateAction<T_Device[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const DevicesListPage = ({devices, setDevices, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {device_name} = useAppSelector((state:RootState) => state.devices)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDeviceName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setDevices(DeviceMocks.filter(device => device.name.toLowerCase().includes(device_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchDevices()
    }

    const fetchDevices = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            const response = await fetch(`${apiUrl}/api/devices/?device_name=${device_name.toLowerCase()}`)
            const data = await response.json()
            setDevices(data.devices)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        createMocks()
        fetchDevices()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={device_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {devices?.map(device => (
                    <Col key={device.id} sm="12" md="6" lg="4">
                        <DeviceCard device={device} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DevicesListPage