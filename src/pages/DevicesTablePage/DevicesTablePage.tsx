import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchDevices, updateDeviceName} from "store/slices/devicesSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import DevicesTable from "components/DevicesTable/DevicesTable.tsx";

const DevicesTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {devices, device_name} = useAppSelector((state) => state.devices)

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

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

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
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/devices/add">
                        <Button color="primary">Добавить оборудование</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {devices.length > 0 ? <DevicesTable devices={devices} fetchDevices={fetchDevices}/> : <h3 className="text-center mt-5">Оборудование не найдено</h3>}
            </Row>
        </Container>
    );
};

export default DevicesTablePage