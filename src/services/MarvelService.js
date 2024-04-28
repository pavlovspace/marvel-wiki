class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    // _apiKey = 'apikey=5ef8f994504e4cd5b226744fbc38f8ba'
    _apiKey = 'apikey=5c038bd6ce84d9ec6fa43f3dab859913'

    _baseOffset = 210

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        const character = this._transformCharacter(res.data.results[0])

        if (character.description.length === 0) {
            character.description = 'The hero is really cool, but not Deadpool :) lol'
        }
        if (character.description.length >= 200) {
            character.description = `${character.description.slice(0, 180)}...And Bla-bla-bla, Deadpool is better.`
        }

        return character
    }

    getAllComics = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}comics?limit=8&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformComics)
    }

    getComic = async (id) => {
        const res = await this.getResource(`${this._apiBase}comics/${id}?${this._apiKey}`)
        const comic = this._transformComics(res.data.results[0])

        return comic
    }

    _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }

    _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
        }
    }
}

export default MarvelService
