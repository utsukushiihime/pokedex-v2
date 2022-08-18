import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
	uri: 'https://beta.pokeapi.co/graphql/v1beta',
	cache: new InMemoryCache(),
});

client
	.query({
		query: gql`
			query samplePokeAPIquery {
				# Gets all the pokemon belonging to generation 3
				gen3_species: pokemon_v2_pokemonspecies(
					where: {
						pokemon_v2_generation: {
							name: { _eq: "generation-iii" }
						}
					}
					order_by: { id: asc }
				) {
					name
					id
				}

				# You can run multiple queries at the same time
				# Counts how many pokemon were released for each generation
				generations: pokemon_v2_generation {
					name
					pokemon_species: pokemon_v2_pokemonspecies_aggregate {
						aggregate {
							count
						}
					}
				}
			}
		`,
	})
	.then((result) => console.log(result));

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
