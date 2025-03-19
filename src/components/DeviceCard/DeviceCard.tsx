import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Device} from "modules/types.ts";
import {
    removeDeviceFromDraftService,
    updateDeviceValue
} from "store/slices/servicesSlice.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addDeviceToService, fetchDevices} from "store/slices/devicesSlice.ts";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

type Props = {
    device: T_Device,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const DeviceCard = ({device, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.services)

    const [local_comment, setLocal_comment] = useState(device.comment)

    const location = useLocation()

    const isServicePage = location.pathname.includes("services")

    const handeAddToDraftService = async () => {
        await dispatch(addDeviceToService(device.id))
        await dispatch(fetchDevices())
    }

    const handleRemoveFromDraftService = async () => {
        await dispatch(removeDeviceFromDraftService(device.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateDeviceValue({
            device_id: device.id,
            comment: local_comment
        }))
    }

    if (isServicePage) {
        return (
            <Card key={device.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={`/api/devices/${device.id}/image`}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {device.name}
                            </CardTitle>
                            <CardText>
                                Кабели: {device.cables} шт.
                            </CardText>
                            <CustomTextarea label="Комментарий" type="number" value={local_comment} setValue={setLocal_comment} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/devices/${device.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftService}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={device.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={`/api/devices/${device.id}/image`}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {device.name}
                </CardTitle>
                <CardText>
                    Кабели: {device.cables} шт.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/devices/${device.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftService}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default DeviceCard