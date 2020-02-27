import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const pieChart = (props) =>{
    const options = {
        chart: {
            plotBackgroundColor: props.plotBackgroundColor,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: '#292D39',
          },
          title: {
            text: `<b style="font-size: 18px;color: white">60%</br><br /><b style="font-size: 15px;color: #06A99C"> ${props.titletext}</b>`,
            align: 'center',
            verticalAlign: 'middle',
            y: 25
          },
          subtitle: {
            text: `<b style="font-size: 18px;color: #D0D0D0;">${props.titletext}</b>`,
            align: 'left'
          },
          legend: {
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
            itemStyle: {
                color: '#D0D0D0'
            }
          },
          tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false,
                format: ' {point.percentage:.0f} %',
                distance: -35,
                style: {
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: "15"
                }
              },
              center: ['50%', '50%'],
              size: '100%',
              colors: props.colors,
              showInLegend: true
            }
          },
          series: [{
            type: 'pie',
            name: '',
            innerSize: '60%',
            data: props.series
          }],
          credits: {
            enabled: false
          },
        }
    return <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
}

export default pieChart;