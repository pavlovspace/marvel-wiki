import React, { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService'

import './RandomCharacter.scss'
import mjolnir from '../../resources/img/mjolnir.png'

class RandomCharacter extends Component {
    componentDidMount() {
        this.updateCharacter()
    }

    state = {
        character: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService()

    onCharacterLoaded = (character) => {
        this.setState({ character: character, loading: false })
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService.getCharacter(id).then(this.onCharacterLoaded).catch(this.onError)
    }

    render() {
        const errorMessage = this.state.error ? <ErrorMessage /> : null
        const spinner = this.state.loading ? <Spinner /> : null
        const content = !(this.state.loading || this.state.error) ? <View character={this.state.character} /> : null

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button className="button button__main" onClick={this.updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = (props) => {
    let imgStyle = { objectFit: 'cover' }
    if (props.character.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'contain' }
    }
    return (
        <div className="randomchar__block">
            <img src={props.character.thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{props.character.name}</p>
                <p className="randomchar__descr">{props.character.description}</p>
                <div className="randomchar__btns">
                    <a href={props.character.homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={props.character.wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomCharacter
