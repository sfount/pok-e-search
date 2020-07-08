import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import pokemonFixture from '../../../test/fixtures/pokemon'
import RightPanel from './RightPanel'

let container = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('presential right panel component', () => {
  it('renders the detail page if there is an actively selected pokemon', () => {
    act(() => {
      render(
        <RightPanel
          selectedPokemon={pokemonFixture}
          selectedPokemonIsFavourite={false}
          onFavouriteClick={null} />,
        container
      )
    })

    expect(document.getElementById('search')).toBeNull()
    expect(document.getElementById('favourite-btn')).not.toBeNull()
  })
})