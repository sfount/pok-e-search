import nock from 'nock'
import { fetchPokemonByName } from './pokemon'

const pokemonName = 'eevee'

describe('pokemon data service', () => {
  beforeAll(() => {
    nock('https://pokeapi.co')
      .get(`/api/v2/pokemon/${pokemonName}`)
      .reply(200, {
        name: 'eevee',
        sprites: {
          front_default: 'https://route.com/to/sprite/url'
        }
      })
    nock('https://pokeapi.co')
      .get(`/api/v2/pokemon-species/${pokemonName}`)
      .reply(200, {
        flavor_text_entries: [{
          flavor_text: 'pokemon description to be translated'
        }]
      })
  })

  afterAll(() => nock.restore())

  it('correctly formats pokemon data from disparate sources', async () => {
    nock('https://api.funtranslations.com')
      .post('/translate/shakespeare.json')
      .reply(200, {
        success: {
          total: 1
        },
        contents: {
          translated: 'pokemon description after being translated'
        }
      })

    const pokemon = await fetchPokemonByName('eevee')
    expect(pokemon).toEqual({
      name: 'eevee',
      description: 'pokemon description after being translated',
      image_url: 'https://route.com/to/sprite/url',
      translated: true
    })
  })
  it('allow skipping translation if rate limited by the api', async () => {
    nock('https://api.funtranslations.com')
      .post('/translate/shakespeare.json')
      .reply(429, {})

    const pokemon = await fetchPokemonByName('eevee')
    expect(pokemon).toEqual({
      name: 'eevee',
      description: 'pokemon description to be translated',
      image_url: 'https://route.com/to/sprite/url',
      translated: false
    })
  })
})