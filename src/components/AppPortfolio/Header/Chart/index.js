import React, { PropTypes } from 'react'
import './index.css'

import ReactHighcharts from 'react-highcharts'
import { formatNumber, padNumber } from '../../../../helpers'

class HeaderChart extends React.Component {
  constructor (props) {
    super(props)

    this.chartData = {
      credits: {
        enabled: false
      },
      title: {
        text: 'Net Worth',
        style: {
          color: '#FFFFFF'
        }
      },
      chart: {
        backgroundColor: '#282828'
      },
      labels: {
        style: {
          color: '#FFFFFF'
        }
      },
      legend: {
        itemStyle: {
          color: '#FFFFFF'
        }
      },
      xAxis: {
        categories: [],
        labels: {
          style: {
            color: '#FFFFFF'
          }
        },
        plotLines: [
          {
            color: '#FFFFFF'
          }
        ],
      },
      yAxis: {
        labels: {
          style: {
            color: '#FFFFFF'
          }
        },
        title: {
          text: 'Amount',
          style: {
            color: '#FFFFFF'
          }
        }
      },
      series: []
    }

    this.update()
    this.chartTimer = setInterval(
      () => this.update(), 1000 * 60 * 1
    )
  }

  componentWillUnmount () {
    clearInterval(this.chartTimer)
  }

  render () {
    return (
      <ReactHighcharts isPureConfig config={this.chartData}></ReactHighcharts>
    )
  }

  update () {
    let categories = []
    let data = []

    this.props.data.forEach(element => {
      let date = new Date(element.createdAt)
      let hour = padNumber(date.getHours())
      let minutes = padNumber(date.getMinutes())
      categories.push(`${hour}:${minutes}`)
      data.push(parseFloat(formatNumber(element.total, 2, '')))
    })

    this.chartData.xAxis.categories = categories
    this.chartData.series = [{
      name: 'Chaos',
      color: '#FFFFFF',
      data: data
    }]
  }
}

export default HeaderChart
