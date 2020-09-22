import React, { useState, useCallback, useEffect, useMemo } from 'react'
import sumBy from 'lodash/sumBy'

import { useStore } from '../../../hooks/useStore'
import { useSubjectCdd } from '../hooks'
import PageStats                        from '../../../components/layout/PageStats'
import { useForecastAccuracy, useLimitedPerformance } from '../hooks'


const ProjectStatsWrapper = ({ project }) => {
  const [loading] = useStore(`realtime[${project.id}].loading`)

  const [rawData] = useLimitedPerformance([project])
  const forecastAccuracy = useForecastAccuracy([project])
  
  const [sddResult, sddLoading] = useSubjectCdd([project])

  const stats = useMemo(() => {
    return [{
      label: `CDD (${project.cdd_base})`,
      value: +(sddResult.toFixed(0)).toLocaleString('en'),
      loading: sddLoading,
    }, {
      label: 'Total Building Consumption',
      value: (+sumBy(rawData, 'elecActualConsumption').toFixed(0)).toLocaleString('en'),
      loading: loading,
    }, {
      label: 'Total Energy Savings (kWh)',
      value: (+sumBy(rawData, 'projectSavings').toFixed(0)).toLocaleString('en'),
      loading: loading,
    }, {
      label: 'Total Energy Savings (AED)',
      value: (+(sumBy(rawData, 'projectSavings') * project.utility_rate_elec).toFixed(0)).toLocaleString('en'),
      loading: loading,
    }, {
      label: 'Forecast Accuracy (%)',
      value: +(forecastAccuracy.toFixed(0)).toLocaleString('en'),
      loading: loading,
    }]
  }, [ sddResult, rawData, project, sddLoading, loading, forecastAccuracy ])
  
  return (
    <PageStats stats={stats}/>
  )
}

export default ProjectStatsWrapper