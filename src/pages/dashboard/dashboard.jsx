import React from 'react';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col';
import PieChart from '../../components/chart/pieChart';

const dashboardView = (props) =>{

    const plotBackgroundColor = '#292D39'

    const occupencySeries = [
        ['Available Seats', 55],
        ['Occupied Seats', 30]
    ];
    const occupencyColors = ["#9D92B2", "#FF9416"];
    const occupencyTitleText = 'Occupancy Rate';

    const utilizationSeries = [
        ['Available Seats', 45],
        ['Occupied Seats', 55]
    ];
    const utilizationColors = ["#9D92B2", "#06A99C"]
    const utilizationTitleText = 'Utilization Rate';

    return <>
        <div className="dashboard">Dashboard</div>
        <Row>
            <Col xs={6}>
                <PieChart
                    series={occupencySeries}
                    colors={occupencyColors}
                    titletext={occupencyTitleText}
                    plotBackgroundColor={plotBackgroundColor}
                />
            </Col>
            <Col xs={6}>
                <PieChart
                    series={utilizationSeries}
                    colors={utilizationColors}
                    titletext={utilizationTitleText}
                    plotBackgroundColor={plotBackgroundColor}
                />
            </Col>
        </Row>
    </>
}

export default dashboardView;