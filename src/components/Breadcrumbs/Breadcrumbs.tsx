import * as React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "store/store.ts";

const Breadcrumbs = () => {

    const location = useLocation()

    const device = useAppSelector((state) => state.devices.device)

    const service = useAppSelector((state) => state.services.service)

    const {is_superuser} = useAppSelector((state) => state.user)

    const crumbs = () => {

        if (location.pathname == '/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/">
                            Главная
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/devices/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Оборудование
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/devices-table/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Таблица оборудования
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/devices/add') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={is_superuser ? "/devices-table/" : "/devices/"}>
                            Оборудование
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Добавление оборудования
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (device) {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={is_superuser ? "/devices-table/" : "/devices/"}>
                            Оборудование
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            {device.name}
                        </Link>
                    </BreadcrumbItem>
                </>
            )
        }

        if (service) {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to="/services/">
                            Заказы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Заказ №{service?.id}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/services/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Заказы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/login/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вход
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/register/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Регистрация
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/profile/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/profile/">
                            Личный кабинет
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        return (
            <>
                <BreadcrumbItem>
                    <Link to="/">
                        Главная
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem></BreadcrumbItem>
            </>
        )
    };

    return (
        <Breadcrumb className="fs-5">
            {crumbs()}
        </Breadcrumb>
    );
};

export default Breadcrumbs