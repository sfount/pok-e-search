import * as React from 'react'
import classNames from 'classnames'

const SearchSVG = () => <svg className="search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
const HeartSVG = () => <svg className="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>

const FavouritesList = ({ favourites, selectedPokemon, onSelectFavourite, inProgress }) => {
  return favourites.map((favourite) => {
    const classes = classNames('favourite', { selected: favourite.name === (selectedPokemon && selectedPokemon.name) }, { 'in-progress': inProgress })
    return (
      <div
        className={ classes }
        key={ favourite.name }
        onClick={ () => { if (!inProgress) { onSelectFavourite(favourite.name) } } }
        data-testid="favourite-entry">
        <img src={ favourite.image_url } />
      </div>
    )
  })
}

const Search = ({ selectedPokemon, onSelectSearch }) => {
  const classes = classNames('icon', 'search-container', { selected: !selectedPokemon })
  return (
    <div className={classes} onClick={() => onSelectSearch() }>
      <SearchSVG />
    </div>
  )
}

const Favourites = ({ favourites, selectedPokemon, onSelectSearch, onSelectFavourite, inProgress }) => {
  return (
   <div>
      <div className="icon">
        <HeartSVG />
      </div>

      <Search
        selectedPokemon={ selectedPokemon }
        onSelectSearch={ onSelectSearch } />

      <div>
        <FavouritesList
          favourites={ favourites }
          selectedPokemon={ selectedPokemon }
          onSelectFavourite={ onSelectFavourite }
          inProgress={ inProgress } />
      </div>
    </div>
  )
}

export default Favourites