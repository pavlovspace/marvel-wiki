import React, { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService'

import './charList.scss'

class CharList extends Component {
    state = {
        character: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.marvelService.getAllCharacters().then(this.onCharacterLoaded).catch(this.onError)
    }

    onCharacterLoaded = (character) => {
        this.setState({ character: character, loading: false })
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    renderItemsCharacter(arr) {
        const items = arr.map((item) => {
            let imgStyle = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'unset' }
            }
            return (
                <li className="char__item" key={item.id} onClick={() => this.props.onCharacterSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return <ul className="char__grid">{items}</ul>
    }

    render() {
        const items = this.renderItemsCharacter(this.state.character)
        const errorMessage = this.state.error ? <ErrorMessage /> : null
        const spinner = this.state.loading ? <Spinner /> : null
        const content = !(this.state.loading || this.state.error) ? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList
