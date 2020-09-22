import React, { useEffect, useMemo, useCallback, useState } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'shards-react'

import CircleLoader from '../../../components/preloadrers/circle-loader'
import charts from '../../../utils/colors'
import { useStore } from '../../../hooks/useStore'
import { useConsumptionsHourlyWholeBuilgings } from '../hooks'
import EnergyTotalChart from '../../../components/metrics/MdbEnergyTotal'
import HourlyConsumptionWholeBuildingChart from '../../../components/metrics/HourlyConsumptionWholeBuilding'


const title = 'DAILY AVERAGE HOURLY CONSUMPTION WHOLE BUILDING'

const splitDaysOfWeekOnArrays = (data) => {
  /** logic */
  return data
}

const categories = (() => {
  const hours = 24
  const categories = []
  for(let i=0; i<hours; i++) {
    categories.push(moment(i, 'H').format('HH'))
  }

  return categories
})()

const HourlyConsumptionWholeBuildingContainer = ({ project }) => {
  const [ rawData = [], loading ] = useConsumptionsHourlyWholeBuilgings([project])
  const data = useMemo(() => {
  /** logic */
   
    return rawData
  }, [rawData])

  return (
    <Row style={{ position: 'relative' }} className='w-100'>
      <HourlyConsumptionWholeBuildingChart 
        title={title}
        categories={categories}
        data={data}
      />
      <CircleLoader show={loading}/>
    </Row>
  )
}

export default HourlyConsumptionWholeBuildingContainer
