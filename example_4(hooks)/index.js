import React from 'react'
import get from 'lodash/get'
import sumBy from 'lodash/sumBy'
import Store from '@werkin/store'
import moment from 'moment'
import papaParse from 'papaparse'

import agentDaily from '../../../../agentDaily'
import { useStore } from '../../../hooks/useStore'


const hourlyConsumption = (mdb, project, start, end) => {
  /** query */
}

const energyPerMdb = (mdb, project, startDate, endDate) => {
  /** query */
}

export function useConsumptionsHourlyWholeBuilgings([project]) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [iotMeters = []] = useStore(`realtime[${project.id}].iotMeters`)
  const [dateRange = {}] = useStore('realtime.dateRange')

  React.useEffect(() => {
    setLoading(true)
    if(iotMeters.length && project.iotName && dateRange.startDate && dateRange.endDate) {
      const query = hourlyConsumption(iotMeters, project.iotName, dateRange.startDate, dateRange.endDate)     
      agentDaily.Influx.loadInfluxData(query)
        .then((raw) => {
          papaParse.parse(raw, {
            worker: true,
            header: true,
            complete: ({ data }) => setData(data),
            error: (err) => console.error(err),
          })
        }).finally(() => setLoading(false))
    }
  }, [iotMeters, project, dateRange])
  return [data, loading]
}

export function useEnergyPerMdb([project]) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [iotMeters = []] = useStore(`realtime[${project.id}].iotMeters`)
  const [dateRange = {}] = useStore('realtime.dateRange')

  React.useEffect(() => {
    setLoading(true)
    setData([])
    if(iotMeters.length && project.iotName && dateRange.startDate && dateRange.endDate) {
      const query = energyPerMdb(iotMeters, project.iotName, dateRange.startDate, dateRange.endDate)     
      agentDaily.Influx.loadInfluxData(query)
        .then((raw) => {
          papaParse.parse(raw, {
            worker: true,
            header: true,
            complete: ({ data }) => setData(data.filter(({ equip, _value }) => equip && _value)),
            error: (err) => console.error(err),
          })
        }).finally(() => setLoading(false))
    }
  }, [iotMeters, project, dateRange])
  return [data, loading]
}

export const useLimitedPerformance = ([ project ]) => {
  const [performance = []] = useStore(`realtime[${project.id}].performance`)
  const [dateRange = {}] = useStore('realtime.dateRange')

  const data = React.useMemo(
    () => performance.filter(({ date }) => date >= dateRange.startDate && date <= dateRange.endDate),
    [dateRange, performance]
  )

  return [data]
}

export const useForecastAccuracy = ([ project ]) => {
  const [rawData] = useLimitedPerformance([ project ])

  const data = React.useMemo(() => {
    return sumBy(
      rawData.filter(({ forecastAccuracy }) => forecastAccuracy),
      'projectSavings'
    ) / sumBy(
      rawData.filter(({ forecastAccuracy }) => forecastAccuracy), 'forecastSavings'
    ) * 100
  }, [rawData])

  return data
}



export function useAlarms([ project ]) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
 
  React.useEffect(() => {
    setLoading(true)
    const query = ''
    
    agentDaily.Influx.loadInfluxData(query)
      .then((raw) => {
        papaParse.parse(raw, {
          worker: true,
          header: true,
          complete: ({ data }) => setData(data.filter(({ site }) => site)),
          error: (err) => console.error(err),
        })
      }).finally(() => setLoading(false))
  }, [project])
  return [data, loading]
}

export function useSiteStatus([ project ]) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
 
  React.useEffect(() => {
    setLoading(true)
    const query = ''
    
    agentDaily.Influx.loadInfluxData(query)
      .then((raw) => {
        papaParse.parse(raw, {
          worker: true,
          header: true,
          complete: ({ data }) => setData(JSON.parse(get(data.find(({ Site }) => Site == project.iotName), 'Online', 'false'))),
          error: (err) => console.error(err),
        })
      }).finally(() => setLoading(false))
  }, [project])
  return [data, loading]
}

export const useSubjectCdd = ([project]) => {
  const [data, setData] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [dateRange = {}] = useStore('realtime.dateRange')

  React.useEffect(() => {
    setLoading(true)
    let formatCdd = ''
    agentDaily.Daily.loadSubjectCdd(project.region, formatCdd, dateRange)
      .then(({ items }) => setData(get(items, '[0].value', 0)))
      .finally(() => setLoading(false))
  }, [project, dateRange])

  return [data, loading]
}

