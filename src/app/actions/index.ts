export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES'
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES'

export const SEARCH_IN_PROGRESS = 'SET_SEARCHING'
export const SEARCH_FAILED = 'SET_FAILED'

export const SELECT_POKEMON = 'SELECT_POKEMON'
export const CLEAR_POKEMON = 'CLEAR_POKEMON'

export function addFavourite(pokemon) {

  // ensure storage is in sync
  localStorage.setItem(pokemon.name, pokemon.image_url)
  return { type: ADD_TO_FAVOURITES, pokemon }
}

export function removeFavourite(pokemon) {

  // ensure storage is in sync
  localStorage.removeItem(pokemon.name)
  return { type: REMOVE_FROM_FAVOURITES, pokemon }
}

export function clearPokemon() {
  return { type: CLEAR_POKEMON }
}

function fetchPokemon(pokemonName) {
  const url = `/api/pokemon/${pokemonName}`

  return fetch(url, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch pokemon')
      }
      return response.json()
    })
    .then((data) => {
      return data
    })
}

function setInProgress() {
  return { type: SEARCH_IN_PROGRESS }
}

function setFailed(code) {
  return { type: SEARCH_FAILED, code }
}

function setPokemon(pokemon) {
  return { type: SELECT_POKEMON, pokemon }
}

// async is enabled through `react-thunk` middleware registerd at the top of the App
// fetch the pokemon definition from the backend API given a name token and pass through
// to reducers
export function lookupPokemon(pokemonName) {
  return function (dispatch) {

    dispatch(setInProgress())

    return fetchPokemon(pokemonName)
      .then((pokemon) => {

        dispatch(setPokemon(pokemon))
      })
      .catch((error) => {

        dispatch(setFailed({
          code: 404
        }))
      })
  }
}


