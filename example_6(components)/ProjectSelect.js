import React, { useState, useCallback }from 'react'
import { connect } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import AdvancedSelect from '../../../components/common/AdvancedSelect'
import { changeCompany } from '../../../../redux/reducers/companies'
import { useStore } from '../../../hooks/useStore'


const ProjectsSelect = ({ options, className, defaultValue, exchange }) => {

  const [value, setValue] = useState()
  const [{ token }, setCookie] = useCookies()
  const { pathname } = useRouter()

  const [dateRange] = useStore('realtime.dateRange')


  const handleProjectChange = useCallback(({ value, label }) => {
    const { companyId } = options.find(({ id }) => id === value)
    setValue({ value, label })
    exchange(
      { 
        companyId,
        token, 
      },
      setCookie,
      `${pathname}${Object.entries({
        projectId: value,
        ...dateRange,
    
      }).reduce((acc, [k, v]) => `${acc}&${k}=${v}`, '?')}`)
  }, [dateRange, pathname, options, exchange, token])

  return (
    <AdvancedSelect     
      value={value}
      defaultValue={defaultValue}
      options={options.map(({ id: value, name: label }) => ({ value, label }))}
      onChange={handleProjectChange}
      className={className}
    />
  )	

}

export default connect(
  state => ({
    options: state.iot.projects,
  }),
  dispatch => ({
    exchange: (...args) => dispatch(changeCompany(...args)),
  })
)(ProjectsSelect)