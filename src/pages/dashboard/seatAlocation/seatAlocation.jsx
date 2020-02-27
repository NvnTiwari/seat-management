import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../../../components/button/button';
import SeatIcon from '../../../assets/images/chair.svg';
import SystemIcom from '../../../assets/images/system_icon.svg';
import WaveIcon from '../../../assets/images/wave_square_icon.svg';
import data from './mockData';

const SeatAlocationView = (props) => {
    const { onSeatSelection } = props;
    let [roomLayout, setRoomLayout] = React.useState();
    let [selectedSeat, setSelectedSeat] = React.useState('');
    const [CTAbutton, setCTAbutton] = React.useState(false);
    const [isSeatAlloted, setIsSeatAlloted] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    React.useEffect(() => {
        const mockData = data;

        var rooms = mockData.reduce(function (r, a) {
            r[a.roomId] = r[a.roomId] || [];
            r[a.roomId].push(a);
            return r;
        }, Object.create(null));
        var roomsArray = [];
        for (var i in rooms) {
            roomsArray.push(rooms[i]);
        }
        //setSeatAllocationData(roomsArray);
        createRoomLayout(roomsArray);
    }, [])

    // const imageComponentFront = <Col xs={1}><img className="seat__rotatechair" src={SeatIcon} onClick={onSeatSelection} /></Col>
    // const imageComponentBack = <Col xs={1}><img src={SeatIcon} onClick={onSeatSelection} /></Col>
    /*for (let i = 0; i < 8; i++) {
        imageComponentFront = <Col xs={1}><img className="seat__rotatechair" id={i + 1} src={SeatIcon} title={title} onClick={() => onSeatSelection(i + 1)} /></Col>
        imageComponentBack = <Col xs={1} title={title}><img src={SeatIcon} id={i + 9} onClick={() => onSeatSelection(i + 9)} /></Col>
        seatIconFront.push(imageComponentFront);
        seatIconBack.push(imageComponentBack);
    }*/

    const onSelection = (seatData) => {
        console.log('seatData', seatData);
        setSelectedSeat(seatData);
        onSeatSelection(seatData);
        setCTAbutton(seatData.isOcupied ? false : true);
    }

    const submitSeatSelection = (seat) => {
        console.log('onSubmitSeat', seat);
        setIsSeatAlloted(true);
        let success = <React.Fragment>
            <Row className='seat__successDiv'>
                <Row className='seat__success'>Seat allocated to {seat.empName}.</Row>
                <Row className='seat__success'>He will recieve update on his email shortly.</Row>
            </Row>
        </React.Fragment>;
        setSuccessMessage(success);
    }

    const createRoomLayout = (seatAllocationData) => {
        let layout = seatAllocationData.map(function (item, index) {
            let room1stHalf, room2ndHalf;
            if (item.length > 8) {
                room1stHalf = item.slice(0, item.length / 2);
                room2ndHalf = item.slice(item.length / 2, item.length);
            } else {
                room1stHalf = item.slice(0, item.length);
                room2ndHalf = null;
            }
            console.log(room1stHalf)
            console.log(room2ndHalf)
            return <React.Fragment>
                <Row id={'Room-' + index} className="seat__Row">
                    {
                        <React.Fragment>
                            <Col xs={2}><img src={SystemIcom} className="seat__system" /></Col>
                            {
                                room1stHalf.slice(0, room1stHalf.length / 2).map((item, index) => {
                                    return <Col xs={room1stHalf.length <= 10 ? 2 : 1}>
                                        <img className={`seat__rotatechair ${item.isOccupied ? 'seat__seatOccupied' : ''}`}
                                            id={item.seatCd}
                                            src={SeatIcon}
                                            title={item.empName == '' ? '' : `Name: ${item.empName} Emp id: ${item.empId} Seat No: ${item.seatCd}`}
                                            onClick={() => onSelection(item)} />
                                    </Col>
                                })
                            }

                            <Col xs={8} className="seat__seatDiv"><hr className={`seat__hr${room1stHalf.length}`} /></Col>
                            <Col xs={2} />


                            {
                                room1stHalf.slice((room1stHalf.length / 2), room1stHalf.length).map((item, index) => {
                                    return <Col xs={room1stHalf.length <= 10 ? 2 : 1} title={item.empName == '' ? '' : `Name: ${item.empName} Emp id: ${item.empId} Seat No: ${item.seatCd}`}>
                                        <img src={SeatIcon}
                                            className={`${item.isOccupied ? 'seat__seatOccupied' : ''}`}
                                            id={item.seatCd}
                                            onClick={() => onSelection(item)} />
                                    </Col>
                                })
                            }
                        </React.Fragment>
                    }
                    }
                </Row>
                <br />
                {/*<Row className='seat__Project'>Dummy Project</Row>*/}

                {room2ndHalf ? <Row id={'Room-' + index} className="seat__Row">
                    {
                        <React.Fragment>
                            <Col xs={2}><img src={SystemIcom} className="seat__system" /></Col>
                            {
                                room2ndHalf.slice(0, room2ndHalf.length / 2).map((item, index) => {
                                    return <Col xs={room2ndHalf.length <= 10 ? 2 : 1}>
                                        <img className={`seat__rotatechair ${item.isOccupied ? 'seat__seatOccupied' : ''}`}
                                            id={item.seatCd}
                                            src={SeatIcon}
                                            title={item.empName == '' ? '' : `Name: ${item.empName} Emp id: ${item.empId} Seat No: ${item.seatCd}`}
                                            onClick={() => onSelection(item)} />
                                    </Col>
                                })
                            }

                            <Col xs={8} className="seat__seatDiv"><hr className={`seat__hr${room2ndHalf.length}`} /></Col>
                            <Col xs={2} />


                            {
                                room2ndHalf.slice((room2ndHalf.length / 2), room2ndHalf.length).map((item, index) => {
                                    return <Col xs={room2ndHalf.length <= 10 ? 2 : 1} title={item.empName == '' ? '' : `Name: ${item.empName} Emp id: ${item.empId} Seat No: ${item.seatCd}`}>
                                        <img src={SeatIcon}
                                            className={`${item.isOccupied ? 'seat__seatOccupied' : ''}`}
                                            id={item.seatCd}
                                            onClick={() => onSelection(item)} />
                                    </Col>
                                })
                            }
                        </React.Fragment>
                    }
                    }
                </Row>
                    : null
                }
            </React.Fragment>
        });
        setRoomLayout(layout);
    }


    /*seatIconFront = seatAllocationData.slice(0, seatAllocationData.length / 2).map((item, index) => {
        return <Col xs={1}>
            <img className={`seat__rotatechair ${item.name ? 'seat__seatOccupied' : ''}`}
                id={index + 1}
                src={SeatIcon}
                title={item.name == '' ? '' : `Name: ${item.name} Emp id: ${item.empId} Seat No: ${item.seatNo}`}
                onClick={() => onSeatSelection(item)} />
        </Col>
    })

    seatIconBack = seatAllocationData.slice((seatAllocationData.length / 2), seatAllocationData.length).map((item, index) => {
        return <Col xs={1} title={item.name == '' ? '' : `Name: ${item.name} Emp id: ${item.empId} Seat No: ${item.seatNo}`}>
            <img src={SeatIcon}
                className={`${item.name ? 'seat__seatOccupied' : ''}`}
                id={index + 9}
                onClick={() => onSeatSelection(item)} />
        </Col>
    })*/



    return <Row className="seat">
        <Col>
            <Row>
                <Col className="seat__title">
                    Seat Allocation
                </Col>
            </Row>
            <div className="seat__seatrow">
                {!isSeatAlloted ? roomLayout : successMessage}
                {/*<Row>
                    <Col xs={2}><img src={SystemIcom} className="seat__system" /></Col>
                    {seatIconFront}
                    <Col xs={2} />

                    <Col xs={2} />
                    <Col xs={8}><hr className="seat__hr" /></Col>
                    <Col xs={2} />

                    <Col xs={2} />
                    {seatIconBack}
                </Row>

                <Row className="seat__textrow">
                    <Col xs={1}><img src={WaveIcon} /></Col>
                    <Col sx={10} className="seat__title seat__title--text">Unimoni Project</Col>
                    <Col xs={1}><img src={WaveIcon} /></Col>
                </Row>*/}

            </div>

            <Row align="right" className="seat__btnrow--btnallocation">
                <Col xs={11} style={{height: "40px"}}>
                    {!isSeatAlloted ? <Button name="Done" className="seat__btn" disabled={!CTAbutton} onClick={() => submitSeatSelection(selectedSeat)} /> : null}
                </Col>
            </Row>
        </Col>
    </Row>
}

export default SeatAlocationView;