import {Button, Card, Col, Row, Tooltip} from "reactstrap";
import {E_ServiceStatus, T_Service} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptService, fetchServices, rejectService} from "store/slices/servicesSlice.ts";
import {useState} from "react";

type Props = {
    service: T_Service
    index: number
}

const ServiceCard = ({service, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptService = async (service_id) => {
        await dispatch(acceptService(service_id))
        await dispatch(fetchServices())
    }

    const handleRejectService = async (service_id) => {
        await dispatch(rejectService(service_id))
        await dispatch(fetchServices())
    }

    const navigate = useNavigate()

    const openServicePage = () => {
        navigate(`/services/${service.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const [qrTooltipOpen, setQrTooltipOpen] = useState(false)

    const toogleQrTooltip = () => setQrTooltipOpen(!qrTooltipOpen)

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[service.status]}
                </Col>
                <Col md={1}>
                    {formatDate(service.date)}
                </Col>
                <Col>
                    {formatDate(service.date_created)}
                </Col>
                <Col>
                    {formatDate(service.date_formation)}
                </Col>
                <Col>
                    {formatDate(service.date_complete)}
                </Col>
                <Col>
                    {service.status == E_ServiceStatus.Completed &&
                        <>
                            <Button color="primary" id={"QrTooltip-" + service.id}
                                    onMouseEnter={toogleQrTooltip} onMouseLeave={toogleQrTooltip}>Показать</Button>
                            <Tooltip
                                placement="left"
                                isOpen={qrTooltipOpen}
                                target={"QrTooltip-" + service.id}
                                style={{maxWidth: "100%"}}
                            >
                                <img src={`data:image/png;base64,${service.qr}`} alt="" width={250}/>
                            </Tooltip>
                        </>
                    }
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openServicePage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {service.owner}
                        </Col>
                        <Col>
                            {service.status == E_ServiceStatus.InWork && <Button color="primary" onClick={() => handleAcceptService(service.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {service.status == E_ServiceStatus.InWork && <Button color="danger" onClick={() => handleRejectService(service.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default ServiceCard