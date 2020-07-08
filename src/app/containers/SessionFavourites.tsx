import { connect } from 'react-redux'

import { clearPokemon, lookupPokemon } from '../actions'

import Favourites from '../components/Favourites'

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites,
    inProgress: state.selected.inProgress,
    selectedPokemon: state.selected.pokemon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSearch: () => dispatch(clearPokemon()),
    onSelectFavourite: (pokemonName) => dispatch(lookupPokemon(pokemonName))
  }
}

const SessionFavourites = connect(mapStateToProps, mapDispatchToProps)(Favourites)

export default SessionFavourites