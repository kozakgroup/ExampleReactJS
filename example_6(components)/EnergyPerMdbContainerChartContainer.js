import React, { useEffect, useMemo, useCallback } from 'react'
import { Container, Row, Col, Button } from 'shards-react'

import CircleLoader from '../../../components/preloadrers/circle-loader'
import EnergyUsagePerMdb from '../../../components/metrics/EnergyUsagePerMdb'
import { useEnergyPerMdb } from '../hooks'


const title = 'ENERGY USAGE PER MDB'

const EnergyPerMdbContainerChartContainer = ({ project }) => {
  const [ rawData = [], loading ] = useEnergyPerMdb([project])

  const data = useMemo(
    () => rawData.map(({ equip, _value }) => ({ name: equip, y: +_value })),
    [rawData]
  )

  return (
    <Row style={{ position: 'relative' }}>
      <EnergyUsagePerMdb 
        data={data}
        title={title}
      />
      <CircleLoader show={loading}/>
    </Row>
   
  )
}

export default EnergyPerMdbContainerChartContainer
