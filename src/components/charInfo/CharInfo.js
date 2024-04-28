import React, { Component } from 'react'
import Spinner from '../spinner/Spinner'

import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false,
    }

    componentDidMount() {
        this.updateCharacter()
    }

    componentDidUpdate(prevProps) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacter()
        }
    }

    marvelService = new MarvelService()
    onCharacterLoaded = (character) => {
        this.setState({ character: character, loading: false })
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    onCharacterLoading = () => {
        this.setState({ loading: true })
    }

    updateCharacter = () => {
        this.onCharacterLoaded()
        if (!this.props.characterId) {
            return
        }

        this.marvelService.getCharacter(this.props.characterId).then(this.onCharacterLoaded).catch(this.onError)
    }

    render() {
        const errorMessage = this.state.error ? <ErrorMessage /> : null
        const spinner = this.state.loading ? <Spinner /> : null
        const content = !(this.state.loading || this.state.error || !this.state.character) ? <View character={this.state.character} /> : null

        const skeleton = this.state.character || this.state.loading || this.state.error ? null : <Skeleton />

        return (
            <div className="char__info">
                {errorMessage}
                {spinner} 
                {content}
                {skeleton}
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
        <>
            <div className="char__basics">
                <img src={props.character.thumbnail} alt={props.character.name} style={imgStyle} />
                <div>
                    <div className="char__info-name"> {props.character.name}</div>
                    <div className="char__btns">
                        <a href={props.character.homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={props.character.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">{props.character.description}</div>

            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {props.character.comics.length === 0 ? (
                    <li className="char__comics-item">
                        This character doesn't have comics. <br /> Zero Carl, zero comics Caaarl.
                    </li>
                ) : (
                    props.character.comics.slice(0, 11).map((value, index) => {
                        return (
                            <li key={index} className="char__comics-item">
                                {value.name}
                            </li>
                        )
                    })
                )}
            </ul>
        </>
    )
}

export default CharInfo
