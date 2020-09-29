import { combineReducers } from 'redux'
import initialState from './initialState'

const reducer  = (state = initialState, action) => {
  switch (action.type) {
    case 'setTopK':
      return {
        ...state,
        topk: action.topk,
      }
    case 'resetTopK':
      return {
        ...state,
        topk: initialState.topk,
      }
    case 'setTokens':
      return {
        ...state,
        tokens: action.tokens,
      }
    case 'resetTokens':
      return {
        ...state,
        tokens: initialState.tokens,
      }
    case 'setTemperature':
      return {
        ...state,
        temperature: action.temperature,
      }
    case 'resetTemperature':
      return {
        ...state,
        temperature: initialState.temperature,
      }
    case 'setSampleText':
      return {
        ...state,
        sampletext: action.sampletext,
      }
    default:
      return state
  }
}

// export default combineReducers(reducer)
export default reducer
