import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Device} from "modules/types.ts";
import "./styles.css"

interface Props {
    selectedDevice: T_Device | null
}

const Breadcrumbs = ({ selectedDevice }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/devices") &&
                <BreadcrumbItem active>
                    <Link to="/devices">
						оборудование
                    </Link>
                </BreadcrumbItem>
			}
            {selectedDevice &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedDevice.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs