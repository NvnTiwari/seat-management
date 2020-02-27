import React from 'react';
import DashboardView from './dashboard';
import SeatAllocationUserInfo from './seatAlocation/seatAlocationUserInfo';
import SeatAllocation from './seatAlocation/seatAlocation';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSeatAllocationUserInfo: true,
            isSeatSelected: false,
            previousElementId: 0,
            enableCTA: false,
            empId: ''
        }
    }

    onSeatAllocation = ( employeeId ) =>{
        this.setState({
            isSeatAllocationUserInfo: false,
            empId: employeeId
        }, () => console.log(this.state));
    }

    onSeatSelection = (data) =>{
        const { previousElementId } = this.state;
        if(previousElementId){
            const prevElement = document.getElementById(previousElementId);
            prevElement.classList.remove("seat__seatselection");
            this.setState({
                previousElementId: data.seatCd,
            });
        } else{
            this.setState({
                previousElementId: data.seatCd,
            });
        }
        const element = document.getElementById(data.seatCd);
        element.classList.add("seat__seatselection");
    }

    render(){
        const { isSeatAllocationUserInfo } = this.state;
        return (
            <div style={{overflowX: 'hidden'}}>
                {/*<DashboardView />*/}
                <div className="dashboard">Dashboard</div>
                {(isSeatAllocationUserInfo) ? <SeatAllocationUserInfo
                    isSeatAllocationUserInfo={isSeatAllocationUserInfo}
                    onSeatAllocation={this.onSeatAllocation}
                /> : <SeatAllocation
                        onSeatSelection={this.onSeatSelection}
                        isSeatSelected={this.isSeatSelected}
                    />} 
            </div>
        )
    }
}

export default Dashboard;