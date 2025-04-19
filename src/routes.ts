import express, { Request, Response } from 'express';
import axios from 'axios';
import { PokemonClient } from 'pokenode-ts';

const router = express.Router();

// GET /getPokemon - Returns information about a Pokemon
router.get('/getPokemon', async (req: Request, res: Response): Promise<any> => {
  try {
    const pokemonClient = new PokemonClient();
    const name = req.query.name as string;
    
    if (!name) {
      return res.status(400).json({ error: 'Pokemon name is required' });
    }

    const pokemon = await pokemonClient.getPokemonByName(name);
    
    const pokemonData = {
      name: pokemon.name,
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((type: any) => type.type.name),
      sprites: {
        front_default: pokemon.sprites.front_default,
        back_default: pokemon.sprites.back_default
      }
    };

    res.json(pokemonData);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});

export default router;
