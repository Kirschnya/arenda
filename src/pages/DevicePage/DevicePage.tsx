import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchDevice, removeSelectedDevice} from "store/slices/devicesSlice.ts";
import {Player} from "video-react";

const DevicePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {device} = useAppSelector((state) => state.devices)

    useEffect(() => {
        dispatch(fetchDevice(id))
        return () => dispatch(removeSelectedDevice())
    }, []);

    if (!device) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container className="pb-5">
            <Row>
                <Col md="6">
                    <Row>
                        <img
                            alt=""
                            src={`/api/devices/${device.id}/image`}
                            className="w-100 mb-5"
                        />
                        <div className="d-flex justify-content-center">
                            <Player
                                playsInline
                                autoPlay
                                src={`/api/devices/${device.id}/video`}
                                fluid={false}
                                height={500}
                            />
                        </div>
                    </Row>
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{device.name}</h1>
                    <p className="fs-5">Описание: {device.description}</p>
                    <p className="fs-5">Кабели: {device.cables} шт.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage