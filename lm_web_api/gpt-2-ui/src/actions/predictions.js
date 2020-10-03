import axios from 'axios'

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

export function fetchPredictionsSuccess(predictions) {
  return {
    type: 'FETCH_PREDICTIONS_SUCCESS',
    predictions: predictions
  }
}

export function fetchPredictions(data) {
  return (dispatch) => {
    dispatch(fetchPredictionsLoading(true));
    const url = 'http://localhost:8000/gpt2'
    const headers = { headers: { Authorization: 'Bearer 337b14a7-5865-4b24-a2f0-44d98133c860' }}
    // const params = { text: "Es war einmal eine Prinzessin, die hatte eine kleine Ente." }
    const params = {
      text: data.sampletext + ' ' + data.generatedtext,
      params: {
        amount_of_predictions: data.amountOfPredictions || 5,
        temperature: data.temperature,
        topk_k: data.topk,
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
        .then((response) => dispatch(fetchPredictionsSuccess(response.data.result.predictions)))
        .catch(() => dispatch(fetchPredictionsError(true, 'Unknown Error')))
  }
}
