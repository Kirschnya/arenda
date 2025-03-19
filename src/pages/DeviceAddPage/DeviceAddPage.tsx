import {Button, Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import React, {useEffect, useState} from "react";
import mockImage from "src/assets/mock.png"
import mockVideo from "src/assets/mock.mp4"
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {createDevice} from "store/slices/devicesSlice.ts";
import {T_DeviceAddData} from "modules/types.ts";
import {Player} from "video-react";

const DeviceAddPage = () => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>()

    const [description, setDescription] = useState<string>()

    const [cables, setPrice] = useState<number>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(mockImage as string)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const [videoFile, setVideoFile] = useState<File>()
    const [videoURL, setVideoURL] = useState<string>(mockVideo as string)

    const handleVideoChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setVideoFile(file)
            setVideoURL(URL.createObjectURL(file))
        }
    }

    const handleCreateDevice = async() => {
        if (!name || !description || !cables) {
            return
        }

        const formData = new FormData<T_DeviceAddData>()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('cables', cables as string)

        if (imgFile) {
            formData.append('image', imgFile, imgFile.name)
        }

        if (videoFile) {
            formData.append('video', videoFile, videoFile.name)
        }

        await dispatch(createDevice(formData as T_DeviceAddData))

        navigate("/devices-table/")
    }

    return (
        <Container className="pb-5">
            <Row>
                <Col md={6}>
                    <Row className="mb-5">
                        <img src={imgURL as string} alt="" className="w-100"/>
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
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description}
                                    setValue={setDescription}/>
                    <CustomInput type="number" label="Кабели" placeholder="Введите цену" value={cables}
                                 setValue={setPrice}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={handleCreateDevice}>Создать</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default DeviceAddPage