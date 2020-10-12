import axios from 'axios'

const urlForGpt2 = () => {
  if (process.env.NODE_ENV === 'development') {
    return  'http://localhost:8000/gpt2'
  } else {
    return window.location.origin + '/gpt2'
  }
}
const url = urlForGpt2()


export function fetchPredictionsError(bool, message) {
  return {
    type: 'FETCH_PREDICTIONS_ERROR',
    hasError: bool,
    errorMessage: message
  }
}

export function fetchPredictionsLoading(bool) {
  return {
    type: 'FETCH_PREDICTIONS_LOADING',
    isLoading: bool
  }
}

export function fetchPredictionsSuccess(predictions, time) {
  return {
    type: 'FETCH_PREDICTIONS_SUCCESS',
    predictions: predictions,
    time: time
  }
}

export function fetchPredictions(data) {
  return (dispatch) => {
    dispatch(fetchPredictionsLoading(true));
    // const url = 'http://localhost:8000/gpt2'
    const headers = { headers: { Authorization: 'Bearer 337b14a7-5865-4b24-a2f0-44d98133c860' }}
    // const params = { text: "Es war einmal eine kleine Prinzessin, die hatte eine goldene Ente." }
    const params = {
      text: data.sampletext + ' ' + data.generatedtext,
      params: {
        amount_of_predictions: data.amountOfPredictions,
        temperature: data.temperature,
        top_k: data.topk,
        tokens_to_generate: data.tokens,
      }
    }
    axios.post(url, params, headers)
      .then((response) => {
        dispatch(fetchPredictionsLoading(false))
          if (response.status !== 200) {
            throw Error(response.statusText)
          }
          return response
        })
        .then((response) => dispatch(fetchPredictionsSuccess(response.data.result.predictions, response.data.time)))
        .catch(() => dispatch(fetchPredictionsError(true, 'Unknown Error')))
  }
}
