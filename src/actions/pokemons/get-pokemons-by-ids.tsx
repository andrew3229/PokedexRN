import { pokeApi } from "../../config/api/pokeApi"
import { Pokemon } from "../../domain/entities/pokemon"
import { PokeAPIPokemon } from "../../infrastucture/interface/pokeapi.interface"
import { PokemonMapper } from "../../infrastucture/mappers/pokemon.mapper"
import { getPokemonById } from "./get-pokemon-by-id"

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
    try {
        const pokemonPromises: Promise<Pokemon>[] = ids.map(id => getPokemonById(id))

        return Promise.all(pokemonPromises)

    } catch (error) {
        throw new Error(`Error getting pokemons ${id}`)
    }
}