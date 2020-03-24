import React from 'react';
import axios from 'axios';
import DashboardView from './dashboard';
import SeatAllocationUserInfo from './seatAlocation/seatAlocationUserInfo';
import SeatAllocation from './seatAlocation/seatAlocation';
// uncomment mockdata when working with API's
// import mockData from './seatAlocation/mockData';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeatAllocationUserInfo: true,
            isSeatSelected: false,
            previousElementId: 0,
            enableCTA: false,
            empData: {},
            seatData: [],
            error: '',
            isSeatDeallocated: false
        }
    }

    onSeatDeAllocation = (employeeData, seatId) => {
        axios.post('http://localhost:8083/seatalloc/deallocateseat', {
            "city": employeeData.city,
            "country": employeeData.country,
            "empId": employeeData.employeeId,
            "empName": employeeData.ownerName,
            "seatID": seatId
        }).then(res => {
            this.setState({
                isSeatAllocationUserInfo: false,
                isSeatDeallocated: true
            })
        })
    };

    onSeatAllocation = (employeeData) => {
        axios(`http://localhost:8083/seatalloc/getallseats/6`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            this.setState({
                isSeatAllocationUserInfo: false,
                empData: employeeData,
                seatData: result.data
            }, () => console.log(this.state));
        }).catch(e => {            
            this.setState({
                error: 'Some error occured',
                empData: employeeData,
                isSeatAllocationUserInfo: false
            })
        });
    }

    onSeatSelection = (data) => {
        const { previousElementId } = this.state;
        if (previousElementId) {
            const prevElement = document.getElementById(previousElementId);
            prevElement.classList.remove("seat__seatselection");
            this.setState({
                previousElementId: data.seatCd,
            });
        } else {
            this.setState({
                previousElementId: data.seatCd,
            });
        }
        const element = document.getElementById(data.seatCd);
        element.classList.add("seat__seatselection");
    }

    render() {
        const { isSeatAllocationUserInfo, isSeatDeallocated } = this.state;
        return (
            <div style={{ overflowX: 'hidden' }}>
                <DashboardView />
                {(isSeatAllocationUserInfo) ? <SeatAllocationUserInfo
                    isSeatAllocationUserInfo={isSeatAllocationUserInfo}
                    onSeatAllocation={this.onSeatAllocation}
                    onSeatDeAllocation={this.onSeatDeAllocation}
                /> : <SeatAllocation
                        onSeatSelection={this.onSeatSelection}
                        isSeatSelected={this.isSeatSelected}
                        isSeatDeallocated={isSeatDeallocated}
                        seatData={this.state.seatData}
                        empData={this.state.empData}
                    />}
            </div>
        )
    }
}

export default Dashboard;