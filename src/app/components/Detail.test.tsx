import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import pokemonFixture from '../../../test/fixtures/pokemon'
import Detail from './Detail'

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

describe('presential details component', () => {
  it('renders with a well formed pokemon', () => {
    act(() => {
      render(
        <Detail
          selectedPokemon={pokemonFixture}
          selectedPokemonIsFavourite={false}
          onFavouriteClick={null} />,
        container
      )
    })
    expect(document.getElementById('overview').textContent).toContain("Its genetic code is irregular. 't may mutate if 't be true 't is exposed to radiation from element stones.")
    expect(document.getElementById('favourite-btn').classList).not.toContain('favourited')
    expect(document.getElementById('alert-info')).toBeNull()
  })

  it('shows a warning if the translation was not possible', () => {
    act(() => {
      render(
        <Detail
          selectedPokemon={{ ...pokemonFixture, translated: false }}
          selectedPokemonIsFavourite={false}
          onFavouriteClick={null} />,
        container
      )
    })
    expect(document.getElementById('alert-info')).not.toBeNull()
    expect(document.getElementById('alert-info').textContent).toContain('Could not translate pokemon description to shakespeare. This is likely a limitation on the number of requests a free integration can make against the translation API.')
  })

  it('highlights the button if the current detailed pokemon is in the favourites list', () => {
    act(() => {
      render(
        <Detail
          selectedPokemon={{ ...pokemonFixture, translated: false }}
          selectedPokemonIsFavourite={true}
          onFavouriteClick={null} />,
        container
      )
    })
    expect(document.getElementById('favourite-btn').classList).toContain('favourited')
    expect(document.getElementById('favourite-btn').textContent).toContain('Remove from favourites')
  })

  it('appropriately calls favourite toggle method when favourite button clicked', () => {
    const onSpy = jest.fn()
    act(() => {
      render(
        <Detail
          selectedPokemon={pokemonFixture}
          selectedPokemonIsFavourite={false}
          onFavouriteClick={onSpy} />,
        container
      )
    })

    const button = document.getElementById('favourite-btn')
    expect(button.textContent).toBe('Add to favourites')

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onSpy).toHaveBeenCalledWith(pokemonFixture, false)
  })
})