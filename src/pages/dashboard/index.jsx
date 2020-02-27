import React from 'react';
import axios from 'axios';
import DashboardView from './dashboard';
import SeatAllocationUserInfo from './seatAlocation/seatAlocationUserInfo';
import SeatAllocation from './seatAlocation/seatAlocation';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeatAllocationUserInfo: true,
            isSeatSelected: false,
            previousElementId: 0,
            enableCTA: false,
            empId: '',
            seatData: [],
            error: ''
        }
    }

    onSeatAllocation = (employeeId) => {

        axios(`http://10.10.33.71:8083/seatalloc/getallseats/2`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            console.log('Result', result);
            this.setState({
                isSeatAllocationUserInfo: false,
                empId: employeeId,
                seatData: result.data
            }, () => console.log(this.state));
        }).catch(e => {
            console.log('error',e);
            this.setState({
                error: 'Some error occured'
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
        const { isSeatAllocationUserInfo } = this.state;
        return (
            <div style={{ overflowX: 'hidden' }}>
                {/*<DashboardView />*/}
                <div className="dashboard">Dashboard</div>
                {(isSeatAllocationUserInfo) ? <SeatAllocationUserInfo
                    isSeatAllocationUserInfo={isSeatAllocationUserInfo}
                    onSeatAllocation={this.onSeatAllocation}
                /> : <SeatAllocation
                        onSeatSelection={this.onSeatSelection}
                        isSeatSelected={this.isSeatSelected}
                        seatData={this.state.seatData}
                    />}
            </div>
        )
    }
}

export default Dashboard;