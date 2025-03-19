import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDevice,
    fetchDevice,
    removeSelectedDevice,
    updateDevice,
    updateDeviceImage, updateDeviceVideo
} from "store/slices/devicesSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {Player} from "video-react";

const DeviceEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {device} = useAppSelector((state) => state.devices)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(device?.name)

    const [description, setDescription] = useState<string>(device?.description)

    const [cables, setPrice] = useState<number>(device?.cables)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(device?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const [videoFile, setVideoFile] = useState<File>()
    const [videoURL, setVideoURL] = useState<string>(device?.video)

    const handleVideoChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setVideoFile(file)
            setVideoURL(URL.createObjectURL(file))
        }
    }

    const saveDevice = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateDeviceImage({
                device_id: device.id,
                data: form_data
            }))
        }

        if (videoFile) {
            const form_data = new FormData()
            form_data.append('video', videoFile, videoFile.name)
            await dispatch(updateDeviceVideo({
                device_id: device.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            cables
        }

        await dispatch(updateDevice({
            device_id: device.id,
            data
        }))

        navigate("/devices-table/")
    }

    useEffect(() => {
        dispatch(fetchDevice(id))
        return () => dispatch(removeSelectedDevice())
    }, []);

    useEffect(() => {
        setName(device?.name)
        setDescription(device?.description)
        setPrice(device?.cables)
        setImgURL(`/api/devices/${device?.id}/image`)
        setVideoURL(`/api/devices/${device?.id}/video`)
    }, [device]);

    const handleDeleteDevice = async () => {
        await dispatch(deleteDevice(id))
        navigate("/devices-table/")
    }

    if (!device) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container className="pb-5">
            <Row>
                <Col md={6}>
                    <Row className="mb-5">
                        <img src={imgURL} alt="" className="w-100"/>
                        <Container className="mt-3 d-flex justify-content-center">
                            <UploadButton handleFileChange={handleFileChange}/>
                        </Container>
                    </Row>
                    <Row>
                        <div className="d-flex justify-content-center">
                            <Player
                                playsInline
                                autoPlay
                                src={videoURL}
                                fluid={false}
                                height={500}
                            />
                        </div>
                        <Container className="mt-3 d-flex justify-content-center">
                            <UploadButton handleFileChange={handleVideoChange} accept=".mp4"/>
                        </Container>
                    </Row>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="number" label="Кабели" placeholder="Введите цену" value={cables} setValue={setPrice}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveDevice}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteDevice}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default DeviceEditPage