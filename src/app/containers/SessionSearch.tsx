import { connect } from 'react-redux'

// note: this container element is nested in another container element, the state
// should be hoisted above and relavent state passed down through props
import { lookupPokemon } from '../actions'

import Search from '../components/Search'

const mapStateToProps = (state) => {
  return {
    inProgress: state.selected.inProgress,
    failedCode: state.selected.failedCode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectPokemon: (pokemonName) => {
      dispatch(lookupPokemon(pokemonName))
    }
  }
}

const SessionSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default SessionSearch
