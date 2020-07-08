import { connect } from 'react-redux'
import { addFavourite, removeFavourite } from '../actions'

import RightPanel from '../components/RightPanel'

const getSelectedPokemonIsFavourite = (selectedPokemon, favourites) => {
  return selectedPokemon && favourites
    .map((favourite) => favourite.name)
    .includes(selectedPokemon.name)
}

const mapStateToProps = (state) => {
  return {
    selectedPokemon: state.selected.pokemon,
    selectedPokemonIsFavourite: getSelectedPokemonIsFavourite(state.selected.pokemon, state.favourites)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFavouriteClick: (pokemon, isPokemonFavourited) => {
      if (isPokemonFavourited) {
        dispatch(removeFavourite(pokemon))
      } else {
        dispatch(addFavourite(pokemon))
      }
    }
  }
}

const SessionRightPanel = connect(mapStateToProps, mapDispatchToProps)(RightPanel)

export default SessionRightPanel