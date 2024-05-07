import React from 'react'
import WidgetContainer from './Cards/WidgetContainer';
import BarChart from './BarChart';
import '../style/BarChart.css'

import '../style/Content.css';

const Content = () => {
  
  return (

    <div className="content">
      <h1>Dashboard</h1>
      <WidgetContainer title="Total Production">
        <div className="bar-chart">
          <BarChart />
        </div>

      </WidgetContainer>
    </div>
  )
}

export default Content