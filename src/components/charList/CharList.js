import React, { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService'

import './charList.scss'

class CharList extends Component {
    constructor(props) {
        super(props)
        this.itemRefs = []
    }
    state = {
        character: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        characterEnded: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharacterListLoading()
        this.marvelService.getAllCharacters(offset).then(this.onCharacterLoaded).catch(this.onError)
    }

    onCharacterListLoading = () => {
        this.setState({ newItemLoading: true })
    }

    onCharacterLoaded = (newCharacter) => {
        let ended = false
        if (newCharacter.length < 9) {
            ended = true
        }
        this.setState((prevState) => ({
            character: [...prevState.character, ...newCharacter],
            loading: false,
            newItemLoading: false,
            offset: prevState.offset + 9,
            characterEnded: ended,
        }))
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    styleToSelectedCharacter = (ref) => {
        this.itemRefs.forEach((itemRef) => {
            if (itemRef.current) {
                itemRef.current.classList.remove('char__item__selected')
            }
        })
        if (ref.current) {
            ref.current.classList.add('char__item__selected')
        }
    }

    renderItemsCharacter(arr) {
        const items = arr.map((item) => {
            let imgStyle = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'unset' }
            }
            const selectedRef = React.createRef()
            this.itemRefs.push(selectedRef)
            return (
                <li
                    ref={selectedRef}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        this.props.onCharacterSelected(item.id)
                        this.styleToSelectedCharacter(selectedRef)
                    }}
                >
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
                <button
                    className="button button__main button__long"
                    disabled={this.state.newItemLoading}
                    onClick={() => this.onRequest(this.state.offset)}
                    style={{ display: this.state.characterEnded ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList
