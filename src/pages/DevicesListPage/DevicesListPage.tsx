import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchDevices, updateDeviceName} from "store/slices/devicesSlice.ts";
import DeviceCard from "components/DeviceCard/DeviceCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const DevicesListPage = () => {

    const dispatch = useAppDispatch()

    const {devices, device_name} = useAppSelector((state) => state.devices)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_service_id, devices_count} = useAppSelector((state) => state.services)

    const hasDraft = draft_service_id != null

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDeviceName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchDevices())
    }

    useEffect(() => {
        dispatch(fetchDevices())
    }, [])

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
                {is_authenticated && !is_superuser &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_service_id={draft_service_id} devices_count={devices_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {devices?.map(device => (
                    <Col key={device.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <DeviceCard device={device} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DevicesListPage