import * as React from 'react'
import classNames from 'classnames'

const Search = ({ onSelectPokemon, inProgress, failedCode }) => {
  const [ search, setSearch ] = React.useState('')

  const onFormSubmit = (e) => {
    onSelectPokemon(search)
    e.preventDefault()
  }

  const errorHint = failedCode
    ? <span className="error-hint">No pokemon found with that name.</span>
    : ''

  const inputClasses = classNames('search', { errored: !!failedCode })
  return (
    <div id="search">
      <h2 className="page-heading">Find Pokémon</h2>
      <span className="hint">The name of the pokémon</span>

      <form onSubmit={ onFormSubmit }>
        { errorHint }
        <div>
          <input
            className={ inputClasses }
            onChange={ (e) => setSearch(e.target.value) }/>
        </div>
        <div>
          <button
            type="submit"
            disabled={ inProgress }
            className="button">
              Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default Search