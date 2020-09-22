import React, { useEffect, useMemo, useCallback } from 'react'
import moment from 'moment'
import { Container, Row, Col, Button } from 'shards-react'

import CircleLoader from '../../../components/preloadrers/circle-loader'
import { useStore } from '../../../hooks/useStore'
import ProjectPerformanceIndexAxes from '../../../components/metrics/ProjectPerformanceIndexAxes'
import { useLimitedPerformance } from '../hooks'


const title = 'PROJECT PERFORMANCE INDEX (kWh)'

const ProjectsPerformanceIndexChartContainer = ({ project }) => {
  const [loading] = useStore(`realtime[${project.id}].loading`)
  const [rawData] = useLimitedPerformance([project])

  const categories = useMemo(
    () => rawData.map(({ date }) => moment(date).format('MMM DD')),
    [rawData]
  )

  const data = useMemo(
    () => {
      return rawData.reduce((acc, _v, index) => [...acc, rawData.slice(0, index)], [])
        .map(values => values.reduce((_sum, { projectSavings: _v }) => _sum + _v, 0,0))
        .map(v => Number(v.toFixed()))
    }, 
    [rawData]
  )

  return (
    <Row style={{ position: 'relative' }}>
      <ProjectPerformanceIndexAxes 
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

export default ProjectsPerformanceIndexChartContainer
