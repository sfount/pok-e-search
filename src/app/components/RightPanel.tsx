import * as React from 'react'

import Detail from '../components/Detail'
import SessionSearch from '../containers/SessionSearch'

const RightPanel = ({ selectedPokemon, onFavouriteClick, selectedPokemonIsFavourite }) => {
  const stage = selectedPokemon
    ? <Detail
      selectedPokemon={ selectedPokemon }
      onFavouriteClick={ onFavouriteClick }
      selectedPokemonIsFavourite={ selectedPokemonIsFavourite} />
    : <SessionSearch />

  return <div>{ stage }</div>
}

export default RightPanel