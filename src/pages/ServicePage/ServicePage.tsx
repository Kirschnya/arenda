import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftService,
    fetchService,
    removeService, sendDraftService,
    triggerUpdateMM, updateService
} from "store/slices/servicesSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_ServiceStatus, T_Device} from "modules/types.ts";
import DeviceCard from "components/DeviceCard/DeviceCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {formatDate} from "utils/utils.ts";

const ServicePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const service = useAppSelector((state) => state.services.service)

    const [tz, setTz] = useState<string>(service?.tz)

    const [date, setDate] = useState<string>(service?.date)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchService(id))
        return () => dispatch(removeService())
    }, []);

    useEffect(() => {
        setTz(service?.tz)
        setDate(service?.date)
    }, [service]);

    const sendService = async (e) => {
        e.preventDefault()

        await saveService()

        await dispatch(sendDraftService())

        navigate("/services/")
    }

    const saveService = async (e?) => {
        e?.preventDefault()

        const data = {
            tz
        }

        await dispatch(updateService(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteService = async () => {
        await dispatch(deleteDraftService())
        navigate("/devices/")
    }

    if (!service) {
        return (
            <></>
        )
    }

    const isDraft = service.status == E_ServiceStatus.Draft
    const isCompleted = service.status == E_ServiceStatus.Completed

    return (
        <Form onSubmit={sendService} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой заказ" : `Заказ №${id}` }</h2>
            <Row className="mb-5 fs-5 w-50">
                <CustomTextarea label="Комментарий к заказу" placeholder="Введи дополнительную информацию к заказу" value={tz} setValue={setTz} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Дата" value={formatDate(date)} disabled={true}/>}
            </Row>
            <Row>
                {service.devices.length > 0 ? service.devices.map((device:T_Device) => (
                    <Row key={device.id} className="d-flex justify-content-center mb-5">
                        <DeviceCard device={device} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Оборудование не добавлено</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveService}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteService}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default ServicePage