import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import pokemonFixture from '../../../test/fixtures/pokemon'
import favouritesFixutre from '../../../test/fixtures/favourites'
import Favourites from './Favourites'

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

describe('presential favourites component', () => {
  it('correctly lists pokemon given a list of favourites', () => {
    act(() => {
      render(
        <Favourites
          favourites={favouritesFixutre}
          selectedPokemon={pokemonFixture}
          onSelectSearch={null}
          onSelectFavourite={null}
          inProgress={false} />,
        container
      )
    })
    expect(document.querySelectorAll('[data-testid=favourite-entry]').length).toBe(2)
  })

  it('will stop new requests to favourites if there is one currently in progress', () => {
    const onSelectFavouriteSpy = jest.fn()
    act(() => {
      render(
        <Favourites
          favourites={favouritesFixutre}
          selectedPokemon={pokemonFixture}
          onSelectSearch={null}
          onSelectFavourite={onSelectFavouriteSpy}
          inProgress={true} />,
        container
      )
    })

    const button = document.querySelector('[data-testid=favourite-entry]')

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onSelectFavouriteSpy).not.toBeCalled()
  })

  it('will correctly pass request to favourites if there is nothing currently in progress', () => {
    const onSelectFavouriteSpy = jest.fn()
    act(() => {
      render(
        <Favourites
          favourites={favouritesFixutre}
          selectedPokemon={pokemonFixture}
          onSelectSearch={null}
          onSelectFavourite={onSelectFavouriteSpy}
          inProgress={false} />,
        container
      )
    })

    const button = document.querySelector('[data-testid=favourite-entry]')

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onSelectFavouriteSpy).toBeCalledWith(favouritesFixutre[0].name)
  })

})