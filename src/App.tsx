import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import DevicesListPage from "pages/DevicesListPage/DevicesListPage.tsx";
import DevicePage from "pages/DevicePage/DevicePage.tsx";
import ServicesPage from "pages/ServicesPage/ServicesPage.tsx";
import ServicePage from "pages/ServicePage/ServicePage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import DevicesTablePage from "pages/DevicesTablePage/DevicesTablePage.tsx";
import DeviceEditPage from "pages/DeviceEditPage/DeviceEditPage.tsx";
import DeviceAddPage from "pages/DeviceAddPage/DeviceAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/devices/" element={<DevicesListPage />} />
                        <Route path="/devices-table/" element={<DevicesTablePage />} />
                        <Route path="/devices/:id/" element={<DevicePage />} />
                        <Route path="/devices/:id/edit" element={<DeviceEditPage />} />
                        <Route path="/devices/add" element={<DeviceAddPage />} />
                        <Route path="/services/" element={<ServicesPage />} />
                        <Route path="/services/:id/" element={<ServicePage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
