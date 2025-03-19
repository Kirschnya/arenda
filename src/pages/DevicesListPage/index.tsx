import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Device} from "src/modules/types.ts";
import DeviceCard from "components/DeviceCard";
import {DeviceMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "./styles.css"

type Props = {
    devices: T_Device[],
    setDevices: React.Dispatch<React.SetStateAction<T_Device[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    deviceName: string,
    setDeviceName: React.Dispatch<React.SetStateAction<string>>
}

const DevicesListPage = ({devices, setDevices, isMock, setIsMock, deviceName, setDeviceName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/devices/?device_name=${deviceName.toLowerCase()}`)
            const data = await response.json()
            setDevices(data.devices)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setDevices(DeviceMocks.filter(device => device.name.toLowerCase().includes(deviceName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={deviceName} onChange={(e) => setDeviceName(e.target.value)} placeholder="Поиск..."></Input>
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
                    <Col key={device.id} xs="4">
                        <DeviceCard device={device} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DevicesListPage