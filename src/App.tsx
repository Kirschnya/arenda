import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import DevicePage from "pages/DevicePage";
import DevicesListPage from "pages/DevicesListPage";
import {Route, Routes} from "react-router-dom";
import {T_Device} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [devices, setDevices] = useState<T_Device[]>([])

    const [selectedDevice, setSelectedDevice] = useState<T_Device | null>(null)

    const [isMock, setIsMock] = useState(false);

    const [deviceName, setDeviceName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedDevice={selectedDevice} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/devices/" element={<DevicesListPage devices={devices} setDevices={setDevices} isMock={isMock} setIsMock={setIsMock} deviceName={deviceName} setDeviceName={setDeviceName}/>} />
                        <Route path="/devices/:id" element={<DevicePage selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
