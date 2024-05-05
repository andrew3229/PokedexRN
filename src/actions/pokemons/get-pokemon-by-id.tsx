import { pokeApi } from "../../config/api/pokeApi"
import { PokeAPIPokemon } from "../../infrastucture/interface/pokeapi.interface"
import { PokemonMapper } from "../../infrastucture/mappers/pokemon.mapper"

export const getPokemonById = async (id: number) => {
    try {
        const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`)

        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

        return pokemon;

    } catch (error) {
        throw new Error(`Error getting pokemons ${id}`)
    }
}