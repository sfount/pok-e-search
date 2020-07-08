import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import pokemonSearch from './reducers'
import App from './components/App'

const favourites = Object.keys(localStorage)
  .sort()
  .map((key) => ({ name: key, image_url: localStorage.getItem(key) }))
const store = createStore(pokemonSearch, { favourites }, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)