import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '../../../components/input/input';
import Button from '../../../components/button/button';

const SeatAlocationUserInfoView = (props) => {
    const { onSeatAllocation, onSeatDeAllocation } = props;
    const [CTAbutton, setCTAbutton] = React.useState(false);
    const [empId, setEmpId] = React.useState('');
    const [seatId, setSeatId] = React.useState('');
    const [employeeData, setEmployeeData] = React.useState({});
    const [error, setError] = React.useState('');
    const [seatInfo, setSeatInfo] = React.useState(true);

    function getSeatinfo() {
        axios(`http://localhost:8083/seatalloc/getseatinfo/${empId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            if (res.data === "") {
                setSeatInfo(true);
            } else {
                setSeatInfo(false);
                setSeatId(res.data.seatId);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        function handlekeydownEvent(event) {

            const { keyCode } = event;
            if (keyCode === 13) {
                getSeatinfo();
                axios(`http://localhost:8081/api/employees/${empId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => {
                    result.data.length > 0 ? result.data.map((item) => {
                        setEmployeeData({
                            employeeId: item.employeeId,
                            employeeName: item.name,
                            ownerName: item.ownerName,
                            email: item.email,
                            country: 'India',
                            city: item.clientLocation,
                            projectName: 'Seat Management',
                            projectRoom: 'Room-2'

                        });
                        setCTAbutton(true);
                        setError(``);
                    }) : setError(`Data not found`);
                }).catch(e => {
                    setEmployeeData({
                        employeeId: '',
                        employeeName: '',
                        email: '',
                        country: '',
                        ownerName: '',
                        city: '',
                        projectName: '',
                        projectRoom: '',
                        seatId: ''
                    });
                    setCTAbutton(false);
                    setError(`Data not found`);
                });
            } else {
                setEmployeeData({
                    employeeId: '',
                    employeeName: '',
                    country: '',
                    email: '',
                    city: '',
                    ownerName: '',
                    projectName: '',
                    projectRoom: '',
                    seatId: ''
                });
                setCTAbutton(false);
                setError(``);
            }
        }

        document.addEventListener('keyup', handlekeydownEvent)
        return () => {
            document.removeEventListener('keyup', handlekeydownEvent)
        }
    }, [empId])

    const handleEmpIdChange = (event) => {
        event.preventDefault();
        setEmpId(event.target.value);
    }

    return <Row className="seat">
        <Col>
            <Row>
                <Col className="seat__title">
                    Seat Allocation
                </Col>
            </Row>
            <Row>
                <Col xs={1} className="seat__labeltext">Emp ID</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={empId || ""} onChange={handleEmpIdChange} disabled={false} />
                </Col>
                <Col xs={1} />
                <Col xs={1} className="seat__labeltext">Name</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={employeeData.employeeName || ""} disabled={true} />
                </Col>
            </Row>

            <Row>
                <Col xs={1} className="seat__labeltext">Country</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={employeeData.country || ""} disabled={true} />
                </Col>
                <Col xs={1} />
                <Col xs={1} className="seat__labeltext">City</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={employeeData.city || ""} disabled={true} />
                </Col>
            </Row>

            <Row>
                <Col xs={1} className="seat__labeltext">Project Name</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={employeeData.projectName || ""} disabled={true} />
                </Col>
                <Col xs={1} />
                <Col xs={1} className="seat__labeltext"> Project Room </Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={employeeData.projectRoom || ""} disabled={true} />
                </Col>
            </Row>
            {error ? <Row className="seat__error"><h4>{error.toString()}</h4></Row> : null}

            <Row align="right" className="seat__btnrow">
                {console.log(seatInfo)}
                {seatInfo ?
                    <Col xs={11}>
                        <Button name="Let Me Allocate Seat" className="seat__btn" disabled={!CTAbutton} onClick={() => onSeatAllocation(employeeData)} />
                    </Col> :
                    <Col xs={11}>
                        <Button name="De-Allocate Seat" className="seat__deAllocate" disabled={!CTAbutton} onClick={() => onSeatDeAllocation(employeeData, seatId)} />
                    </Col>
                }

            </Row>
        </Col>
    </Row>
}

export default SeatAlocationUserInfoView;