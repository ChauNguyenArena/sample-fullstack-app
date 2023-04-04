import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './redux/reducer'
import actions from './redux/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import App from './App'

export default function AppStore(props) {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  let reduxState = {}
  Object.keys(reducer).forEach((key) => (reduxState[key] = useSelector((state) => state[key].data)))

  let reduxActions = {}
  Object.keys(actions).forEach((key) => {
    reduxActions[key] = async (data) => await actions[key](dispatch, data)
  })

  return <App {...reduxState} actions={reduxActions} location={location} navigate={navigate} />
}
