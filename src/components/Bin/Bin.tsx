import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_service_id: string,
    devices_count: number
}

const Bin = ({isActive, draft_service_id, devices_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/services/${draft_service_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {devices_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin