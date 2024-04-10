import React, { Component } from 'react'
import AppHeader from '../appHeader/AppHeader'
import RandomCharacter from '../randomCharacter/RandomCharacter'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'

import decoration from '../../resources/img/vision.png'

class App extends Component {
    state = {
        selectedCharacter: null,
    }

    onCharacterSelected = (id) => {
        this.setState({
            selectedCharacter: id,
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomCharacter />
                    <div className="char__content">
                        <CharList onCharacterSelected={this.onCharacterSelected} />
                        <CharInfo characterId={this.state.selectedCharacter}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App
