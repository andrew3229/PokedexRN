import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPokemon, PokeApiPaginateResponse } from "../../infrastucture/interface/pokeapi.interface";
import { PokemonMapper } from "../../infrastucture/mappers/pokemon.mapper";

export const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 2000))
}

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {

    // await sleep();


    try {

        const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeApiPaginateResponse>(url);

        const pokemonPromises = data.results.map(info => {
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });

        const pokeApiPokemons = await Promise.all(pokemonPromises);

        const pokemonsPromises = pokeApiPokemons.map(pokemon => PokemonMapper.pokeApiPokemonToEntity(pokemon.data))


        return await Promise.all(pokemonsPromises);
    } catch (error) {
        throw new Error('Error getting pokemons')
    }
}