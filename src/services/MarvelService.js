class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    // _apiKey = 'apikey=5ef8f994504e4cd5b226744fbc38f8ba'
    _apiKey = 'apikey=5c038bd6ce84d9ec6fa43f3dab859913'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
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
}

export default MarvelService
