import React, { Component } from 'react';
import Axios from 'axios';

class Pokedex extends Component {
  constructor() {
    super();
    this.state = {
      pokemonName: 'pikachu',
      pokemonImage: ''
    };
  }

  async componentDidMount() {
    const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`);
    this.setState({ pokemonImage: res.data.sprites.other['official-artwork'].front_default });
  }

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (this.state.pokemonName === '') {
        return;
      }
      if (prevState.pokemonName === this.state.pokemonName) {
        return;
      }
      const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`);
      this.setState({ pokemonImage: res.data.sprites.other['official-artwork'].front_default });
    } catch (err) {
      this.setState({
        pokemonImage: ''
      });
    }
  }

  render() {
    return (
      <div>
        <h1>My First Pokedex</h1>
        <input
          value={this.state.pokemonName}
          onChange={(e) => {
            this.setState({ pokemonName: e.target.value.toLowerCase() });
          }}
        />
        <div>
          <img src={this.state.pokemonImage} />
        </div>
      </div>
    );
  }
}

export default Pokedex;
