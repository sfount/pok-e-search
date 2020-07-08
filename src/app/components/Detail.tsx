import * as React from 'react'
import classNames from 'classnames'

const HeartSVG = () => <svg className="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>

const InfoAlert = (props) => (
  <div id="alert-info" className="info">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>
      <span>Something whent wrong.</span>
    </div>
    <p>{ props.children }</p>
  </div>
)

const FavouriteButton = ({ onFavouriteClick, selectedPokemon, selectedPokemonIsfavourite }) => {
  const classes = classNames('favourite-button', { favourited: selectedPokemonIsfavourite })
  const text = selectedPokemonIsfavourite ? 'Remove from favourites' : 'Add to favourites'
  return (
    <div
      id='favourite-btn'
      className={ classes }
      onClick={ () => onFavouriteClick(selectedPokemon, selectedPokemonIsfavourite) }>
      <HeartSVG />
      <span>{ text }</span>
    </div>
  )
}

const Detail = ({ selectedPokemon, onFavouriteClick, selectedPokemonIsFavourite }) => {
  const status = selectedPokemon.translated
    ? ''
    : <InfoAlert>Could not translate pokemon description to shakespeare. This is likely a limitation on the number of requests a free integration can make against the translation API.</InfoAlert>
  return (
    <div>
      <h2 className="page-heading">{ selectedPokemon.name }</h2>

      <FavouriteButton
        onFavouriteClick={ onFavouriteClick }
        selectedPokemon={ selectedPokemon }
        selectedPokemonIsfavourite={ selectedPokemonIsFavourite } />
      <div id="overview" className="overview">
        <img className="details-img" src={ selectedPokemon.image_url } />
        <span>{ selectedPokemon.description }</span>
      </div>
      { status }
    </div>
  )
}

export default Detail