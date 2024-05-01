import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";

export const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 2000))
}

export const getPokemons = async (): Promise<Pokemon[]> => {

    await sleep();

    console.log('Get pokemons');
    
    

    try {

        const url = '/pokemon';
        const { data } = await pokeApi.get(url);

        return [];
    } catch (error) {
        throw new Error('Error getting pokemons')
    }
}