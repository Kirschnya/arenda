import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Device} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {DeviceMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedDevice: T_Device | null,
    setSelectedDevice: React.Dispatch<React.SetStateAction<T_Device | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const DevicePage = ({selectedDevice, setSelectedDevice, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/devices/${id}`)
            const data = await response.json()
            setSelectedDevice(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedDevice(DeviceMocks.find(device => device?.id == parseInt(id as string)) as T_Device)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedDevice(null)
    }, []);

    if (!selectedDevice) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedDevice.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedDevice.name}</h1>
                    <p className="fs-5">Описание: {selectedDevice.description}</p>
                    <p className="fs-5">Кабели: {selectedDevice.cables} шт.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage