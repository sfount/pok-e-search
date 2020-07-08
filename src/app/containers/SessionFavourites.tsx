import { connect } from 'react-redux'

import { clearPokemon, lookupPokemon } from '../actions'

import Favourites from '../components/Favourites'

/**
 *
 * @param state {
 *  // list of favourites that can be populated through the initial application
 *  // syncing state or the uesr adding and removing entries
 *  favourites: Favourite[]
 * }
 */
const mapStateToProps = (state) => {
  return {
    favourites: state.favourites,
    inProgress: state.selected.inProgress,
    selectedPokemon: state.selected.pokemon
  }
}

/**
 *
 * @resolves dispatchProps {
 *  // store hook into the user requesting a new search, this will clear the existing
 *  // session
 *  onSelectSearch: (): void
 * }
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSearch: () => dispatch(clearPokemon()),
    onSelectFavourite: (pokemonName) => dispatch(lookupPokemon(pokemonName))
  }
}

const SessionFavourites = connect(mapStateToProps, mapDispatchToProps)(Favourites)

export default SessionFavourites