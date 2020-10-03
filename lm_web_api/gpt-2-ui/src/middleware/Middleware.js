import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


const loggingMiddleware = (store) => (next) => (action) => {
  console.log('dispatching', action)
  console.log('previous time', store.getState().time)
  next(action)
  // log the updated state, after calling next(action)
  console.log('new time', store.getState().time)
}




export default applyMiddleware(thunk, loggingMiddleware)
