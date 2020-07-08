import { connect } from 'react-redux'

// note: this container element is nested in another container element, the state
// should be hoisted above and relavent state passed down through props
import { lookupPokemon } from '../actions'

import Search from '../components/Search'

/**
 *
 * @param state {
 *  // the active pokemon that the user has searched or linked to through favourites
 *  // this POJO also tracks the async process for getting details from the backend
 *  selected: {
 *    // flag indicating if an async action is currently communicating with the backend
 *    inProgress: boolean
 *    // http status of a failure if it has failed
 *    failedCode: number | undefined
 *  }
 * }
 */
const mapStateToProps = (state) => {
  return {
    inProgress: state.selected.inProgress,
    failedCode: state.selected.failedCode
  }
}

/**
 *
 * @resolves dispatchProps {
 *   // store hook for requesting a new selected pokemon on the session
 *   onSelectPokent: (pokemonName: string): void
 * }
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectPokemon: (pokemonName) => {
      dispatch(lookupPokemon(pokemonName))
    }
  }
}

const SessionSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default SessionSearch
