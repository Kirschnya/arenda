import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Device} from "modules/types.ts";

interface DeviceCardProps {
    device: T_Device,
    isMock: boolean
}

const DeviceCard = ({device, isMock}: DeviceCardProps) => {
    return (
        <Card key={device.id} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : device.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {device.name}
                </CardTitle>
                <CardText>
                    Кабели: {device.cables} руб.
                </CardText>
                <Link to={`/devices/${device.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default DeviceCard