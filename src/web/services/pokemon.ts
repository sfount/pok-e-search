import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 24 * 60 * 60 * 1000
})

const client = axios.create({
  adapter: cache.adapter
})

export const fetchPokemonByName = async (name) => {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`
  const shakespeareUrl = 'https://api.funtranslations.com/translate/shakespeare.json'

  let translation = null

  // fetch pokemon data on the species (for description) and the pokemon (for image)
  const [ pokemon, species ] = await Promise.all([
    client.get(pokemonUrl).then((result) => result.data),
    client.get(speciesUrl).then((result) => result.data)
  ])

  const description = species.flavor_text_entries[0].flavor_text

  // optional translation (given limited availability of key)
  try {
    const shakespeare = await client.post(shakespeareUrl, { text: description }, { timeout: 1000 }).then((result) => result.data)
    if (shakespeare.success && shakespeare.success.total) {
      translation = shakespeare.contents.translated
    }
  } catch (e) {
    console.log('Failed to fetch shakespeare translation' , e.message)
  }

  return {
    name: pokemon.name,
    image_url: pokemon.sprites.front_default,
    description: translation || description,
    translated: !!translation
  }
}