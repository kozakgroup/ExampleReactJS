import React from 'react'
import Router from 'next/router'

import CircleLoader from '../../../components/preloadrers/circle-loader'
import ActiveAlarm from '../../../images/portfolio-dashboard/alarm-red.svg'
import InactiveAlarm from '../../../images/portfolio-dashboard/alarm-grey.svg'
import TooltipOnPopover from '../../../../src/shared/TooltipOnPopover'
import { useAlarms, useSiteStatus } from '../hooks'


const AlarmsContainer = ({ project }) => {
  const [ alarms = [], alarmsLoading ] = useAlarms([project]) 
  const [ siteStatus ] = useSiteStatus([project]) 

  return (
    <>
      <TooltipOnPopover title={`${siteStatus ? 'Online' : 'Offline'}`}>
        <i style={{ color: siteStatus ? '#63F0A3' : 'red' }} class="fa fa-wifi fa-2x" aria-hidden="true"></i>
      </TooltipOnPopover>
      <div style={{ position: 'relative' }} onClick={() =>
        Router.push({
          pathname: '/alarms/table',
          query: { project: project.iotName },
        })}>
        <img
          src={alarms.length > 0 ? ActiveAlarm : InactiveAlarm}
          alt=''
          width="30"
          height="30"
          style={{ cursor: 'pointer' }}
          title={`Active Alarms ${alarms.length}`}
        />
        <CircleLoader show={alarmsLoading} />
      </div>
    </>
  )
}

export default AlarmsContainer