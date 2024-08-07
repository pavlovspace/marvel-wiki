import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import AppBanner from '../appBanner/AppBanner'
import './singleComic.scss'

const SingleComic = () => {
    const { comicId } = useParams()
    const [comic, setComic] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        setLoading(true)
        marvelService
            .getComic(comicId)
            .then(onComicLoaded)
            .catch((error) => {
                setError(true)
                setLoading(false)
            })
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
        setLoading(false)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    )
}

export default SingleComic
