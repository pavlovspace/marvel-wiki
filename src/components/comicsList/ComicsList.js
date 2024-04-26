import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import MarvelService from '../../services/MarvelService'
import './comicsList.scss'

class ComicsList extends Component {
    constructor(props) {
        super(props)
        this.itemRefs = []
    }
    state = {
        comics: [],
        loading: true,
        error: false,
        offset: 210,
        newItemLoading: false,
        comicsEnded: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
        this.marvelService
        .getAllComics()
        .then((res) => {
            console.log(res[0].thumbnail.path+"."+res[0].thumbnail.extension)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    onRequest = (offset) => {
        this.onComicsListLoading()
        this.marvelService.getAllComics(offset).then(this.onComicsLoaded).catch(this.onError)
    }

    onComicsListLoading = () => {
        this.setState({ newItemLoading: true })
    }

    onComicsLoaded = (newComics) => {
        let ended = false

        if (newComics.length < 8) {
            ended = true
        }
        this.setState((prevState) => ({
            comics: [...prevState.comics, ...newComics],
            loading: false,
            newItemLoading: false,
            offset: prevState.offset + 8,
            comicsEnded: ended,
        }))
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    renderItemsComics(arr) {
        const items = arr.map((item) => {
            let imgStyle = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'unset' }
            }
            const selectedRef = React.createRef()
            this.itemRefs.push(selectedRef)
            return (
                <li ref={selectedRef} className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail.path+"."+item.thumbnail.extension} alt={item.title} style={imgStyle} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return <ul className="comics__grid">{items}</ul>
    }

    render() {
        const items = this.renderItemsComics(this.state.comics)
        const errorMessage = this.state.error ? <ErrorMessage /> : null
        const spinner = this.state.loading ? <Spinner /> : null
        const content = !(this.state.loading || this.state.error) ? items : null

        return (
            <div className="comics__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={this.state.newItemLoading}
                    onClick={() => this.onRequest(this.state.offset)}
                    style={{ display: this.state.comicsEnded ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default ComicsList

//         render() {
//             return (
// <>

// </>
//             )
//

// const ComicsList = () => {
//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <Link to={`/comics/{item.id}`}>
//                         <img src={uw} alt="ultimate war" className="comics__item-img" />
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </Link>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img" />
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img" />
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img" />
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img" />
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img" />
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img" />
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img" />
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }
