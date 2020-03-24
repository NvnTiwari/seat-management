import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
// import emailjs from 'emailjs-com';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../../../components/button/button';
import SeatIcon from '../../../assets/images/chair.svg';
import SystemIcom from '../../../assets/images/system_icon.svg';
// import WaveIcon from '../../../assets/images/wave_square_icon.svg';
import mockData from './mockData';
import { createFactory } from 'react';

const SeatAlocationView = (props) => {
    const { onSeatSelection, seatData, empData, isSeatDeallocated } = props;
    let [roomLayout, setRoomLayout] = useState();
    let [selectedSeat, setSelectedSeat] = useState('');
    const [CTAbutton, setCTAbutton] = useState(false);
    const [isSeatAlloted, setIsSeatAlloted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        /*uncomment below line if working with api data*/
        let data = seatData.length > 0 ? seatData : mockData;
        // let data = mockData;        
        var rooms = data.reduce(function (r, a) {
            r[a.roomId] = r[a.roomId] || [];
            r[a.roomId].push(a);
            return r;
        }, Object.create(null));
        var roomsArray = [];
        for (var i in rooms) {
            roomsArray.push(rooms[i]);
        }
        if (isSeatDeallocated) {

            setRoomLayout(createdummyRoom())
        } else {
            createRoomLayout(roomsArray);
        }

    }, [])


    const onSelection = (seatData) => {
        setSelectedSeat(seatData);
        onSeatSelection(seatData);
        setCTAbutton(seatData.isOccupied ? false : true);
    }

    const submitSeatSelection = (seat) => {
        let success = <Fragment>
            <Row className='seat__successDiv'>
                <Row className='seat__success'>Seat allocated to {empData.employeeName} {empData.employeeId}.</Row>
                <Row className='seat__success'>He will receive update on his mail shortly!.</Row>
            </Row>
        </Fragment>;
        const faliure = <Fragment>
            <Row className='seat__successDiv'>
                <Row className='seat__success'>Something Went Wrong...</Row>
                <Row className='seat__success'>Please Try Again!!</Row>
            </Row>
        </Fragment>;
        axios.post('http://localhost:8083/seatalloc/allocateseat', {
            "city": empData.city,
            "country": "India",
            "empId": empData.employeeId,
            "empName": empData.employeeName,
            "seatId": parseInt(seat.seatId)
        })
            .then(function (response) {
                setIsSeatAlloted(true);
                setSuccessMessage(success);
                axios.post('http://localhost:8088/mailsender/mailsend', {
                    "emailAddress": empData.email,
                    "empName": empData.ownerName,
                    "msg": "The seat has been allocated to you"
                }).then(res => {
                    console.log("")
                }).catch(err => console.log(err))
            })
            .catch((error) => {
                setSuccessMessage(faliure);
            });

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
            return <Fragment>
                <Row id={'Room-' + index} key={index} className={item.length > 8 ? "seat__Row" : "seat__Row_small"}>
                    {
                        <Fragment>
                            <Col xs={2}><img src={SystemIcom} className="seat__system" /></Col>
                            {
                                room1stHalf.slice(0, room1stHalf.length / 2).map((item, index) => {
                                    return <Col xs={room1stHalf.length <= 10 ? 2 : 1}>
                                        <img className={`seat__rotatechair ${item.isOccupied ? 'seat__seatOccupied' : 'seats'}`}
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
                        </Fragment>
                    }
                </Row>
                <br />
                <Row className='seat__Project'>ATP Room</Row>

                {room2ndHalf ? <Row id={'Room-' + index} className="seat__Row">
                    {
                        <Fragment>
                            <Col xs={2}><img src={SystemIcom} className="seat__system" /></Col>
                            {
                                room2ndHalf.slice(0, room2ndHalf.length / 2).map((item, index) => {
                                    return <Col key={index} xs={room2ndHalf.length <= 10 ? 2 : 1}>
                                        <img className={`seat__rotatechair ${item.isOccupied ? 'seat__seatOccupied' : 'seats'}`}
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
                                            className={`${item.isOccupied ? 'seat__seatOccupied' : 'seats'}`}
                                            id={item.seatCd}
                                            onClick={() => onSelection(item)} />
                                    </Col>
                                })
                            }
                        </Fragment>
                    }
                </Row>
                    : null
                }
            </Fragment>
        });
        setRoomLayout(layout);
    }

    const createdummyRoom = () => {
        return <Fragment>
            <Row className='seat__successDiv'>
                <Row className='seat__success'>Seat is De-allocated</Row>
            </Row>
        </Fragment>
    }

    return <Row className="seat">
        <Col>
            <Row>
                <Col className="seat__title">
                    {isSeatDeallocated ? "Seat De-allocation" : "Seat Allocation"}
                </Col>
            </Row>
            <div className="seat__seatrow">
                {!isSeatAlloted ? roomLayout : successMessage}
            </div>

            {isSeatDeallocated ? <Row align="right" className="seat__btnrow--btnallocation"></Row> : <Row align="right" className="seat__btnrow--btnallocation">
                <Col xs={11} style={{ height: "40px" }}>
                    {!isSeatAlloted ? <Button name="Done" className="seat__btn" disabled={!CTAbutton} onClick={() => submitSeatSelection(selectedSeat)} /> : null}
                </Col>
            </Row>}

        </Col>
    </Row>
}

export default SeatAlocationView;