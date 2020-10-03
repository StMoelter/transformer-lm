import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


const loggingMiddleware = (store) => (next) => (action) => {
  console.log('dispatching', action)
  console.log('previous text', store.getState().generatedtext)
  next(action)
  // log the updated state, after calling next(action)
  console.log('new text', store.getState().generatedtext)
}




export default applyMiddleware(thunk, loggingMiddleware)
