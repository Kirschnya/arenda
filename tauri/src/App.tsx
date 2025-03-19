import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import DevicePage from "pages/DevicePage/DevicePage.tsx";
import DevicesListPage from "pages/DevicesListPage/DevicesListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Device} from "modules/types.ts";

function App() {

    const [devices, setDevices] = useState<T_Device[]>([])

    const [selectedDevice, setSelectedDevice] = useState<T_Device | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedDevice={selectedDevice}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/devices/" element={<DevicesListPage devices={devices} setDevices={setDevices} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/devices/:id" element={<DevicePage selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
