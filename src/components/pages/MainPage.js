import React, { Component } from 'react'
import RandomCharacter from '../randomCharacter/RandomCharacter'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import decoration from '../../resources/img/vision.png'

class MainPage extends Component {
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
            <>
                <RandomCharacter />
                <div className="char__content">
                    <CharList onCharacterSelected={this.onCharacterSelected} />
                    <CharInfo characterId={this.state.selectedCharacter} />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </>
        )
    }
}
export default MainPage
