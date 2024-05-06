import { pokeApi } from "../../config/api/pokeApi";
import { PokeApiPaginateResponse } from "../../infrastucture/interface/pokeapi.interface";

export const getPokemonNameWithId = async () => {
    const url = `pokemon?limit=1000`;
    const { data } = await pokeApi.get<PokeApiPaginateResponse>(url);

    return data.results.map((info => ({ name: info.name, id: info.url.split('/')[6] })));

}