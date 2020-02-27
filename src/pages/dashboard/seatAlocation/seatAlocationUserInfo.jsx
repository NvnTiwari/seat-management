import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '../../../components/input/input';
import Button from '../../../components/button/button';

const SeatAlocationUserInfoView = (props) => {
    const { onSeatAllocation } = props;
    const [CTAbutton, setCTAbutton] = React.useState(false);
    const [empId, setEmpId] = React.useState('');
    const [employeeName, setEmployeeName] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [error, setError] = React.useState('');
    const [city, setCity] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [projectRoom, setProjectRoom] = React.useState('');

    React.useEffect(() => {
        function handlekeydownEvent(event) {
            const { keyCode } = event;
            if (keyCode === 13) {
                console.log('Enter is clicked', empId);
                setEmployeeName('Vaibhav');
                setCountry('India');
                setCity('Noida');
                setProjectName('Seat Management');
                setProjectRoom('Room-2');
                setCTAbutton(true);
                /*axios(`http://10.10.33.71:8081/api/employees/${empId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => {
                    console.log('Result', result);
                      axios({
                        method: 'post',
                        url: `${result.request.responseURL}`,
                        data: {
                            username: 'admin',
                            password: 'p@ssw0rd'
                        }
                      }).then((response)=>{
                        console.log(response);
                      }).catch((response)=>{
                        console.log(response);
                      })

                }).catch(e => {
                    setError(e);
                });*/
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
        console.log(empId);
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
                    <Input type="text" className="seat__input" value={empId} onChange={handleEmpIdChange} disabled={false} />
                </Col>
                <Col xs={1} />
                <Col xs={1} className="seat__labeltext">Name</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={employeeName} disabled={true} />
                </Col>
            </Row>

            <Row>
                <Col xs={1} className="seat__labeltext">Country</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={country} disabled={true} />
                </Col>
                <Col xs={1} />
                <Col xs={1} className="seat__labeltext">City</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={city} disabled={true} />
                </Col>
            </Row>

            <Row>
                <Col xs={1} className="seat__labeltext">Project Name</Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={projectName} disabled={true} />
                </Col>
                <Col xs={1} />
                <Col xs={1} className="seat__labeltext"> Project Room </Col>
                <Col xs={4}>
                    <Input type="text" className="seat__input" value={projectRoom} disabled={true} />
                </Col>
            </Row>

            <Row align="right" className="seat__btnrow">
                <Col xs={11}>
                    <Button name="Let Me Allocate Seat" className="seat__btn" disabled={!CTAbutton} onClick={() => onSeatAllocation(empId)} />
                </Col>
            </Row>
        </Col>
    </Row>
}

export default SeatAlocationUserInfoView;