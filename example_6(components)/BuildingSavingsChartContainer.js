import React, { useEffect, useMemo, useCallback } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'shards-react'

import CircleLoader from '../../../components/preloadrers/circle-loader'
import charts from '../../../utils/colors'
import { useStore } from '../../../hooks/useStore'
import { useLimitedPerformance } from '../hooks'
import BuildingsSavingsChart from '../../../components/metrics/BuildingsSavings'


const title = 'BUILDING SAVINGS (kWh)'

const BuildingSavingsChartContainer = ({ project }) => {
  const [loading] = useStore(`realtime[${project.id}].loading`)

  const [rawData] = useLimitedPerformance([project])

  const categories = useMemo(
    () => rawData.map(({ date }) => moment(date).format('MMM DD')),
    [rawData]
  )

  const data = useMemo(
    () => {
      return rawData.map(({ projectSavings }) => projectSavings)
    }, 
    [rawData]
  )

  return (
    <Row style={{ position: 'relative' }}>
      <BuildingsSavingsChart 
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

export default BuildingSavingsChartContainer
