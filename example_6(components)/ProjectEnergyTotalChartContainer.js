import React, { useEffect, useMemo, useCallback } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'shards-react'

import CircleLoader from '../../../components/preloadrers/circle-loader'
import charts from '../../../utils/colors'
import { useStore } from '../../../hooks/useStore'
import EnergyTotalChart from '../../../components/metrics/MdbEnergyTotal'
import { useLimitedPerformance } from '../hooks'


const title = 'PROJECT ENERGY TOTAL (kWh)'

const ProjectEnergyTotalChartContainer = ({ project }) => {
  const [loading] = useStore(`realtime[${project.id}].loading`)
  const [rawData] = useLimitedPerformance([project])

  const categories = useMemo(
    () => rawData.map(({ date }) => moment(date).format('MMM DD')),
    [rawData]
  )

  const data = useMemo(
    () => {
      return [{
        name: 'Energy Adjusted/Tenant',
        data: rawData.map(({ elecAdjustedConsumption }) => elecAdjustedConsumption),
        color: charts.primary.value,
      },{
        name: 'Forecast',
        data: rawData.map(({ elecForecastConsumption }) => elecForecastConsumption),
        type: 'line',
        color: charts.forecast.value,
      },{
        name: 'Baseline',
        data: rawData.map(({ elecCommonBaseline }) => elecCommonBaseline),
        type: 'line',
        color: charts.baseline.value,
      },{
        name: 'Actual Consumptions',
        data: rawData.map(({ elecActualConsumption }) => elecActualConsumption),
        type: 'line',
        color: charts.adjustedbaseline.value,
      }]
    }, 
    [rawData]
  )

  return (
    <Row className='w-100' style={{ position: 'relative' }}>
      <EnergyTotalChart 
        title={title}
        categories={categories}
        data={data}
      />
      <CircleLoader
        show={loading}
      ></CircleLoader>
    </Row>
  )
}

export default ProjectEnergyTotalChartContainer
