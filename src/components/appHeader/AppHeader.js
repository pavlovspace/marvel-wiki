import './appHeader.scss'

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="/characters">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <a href="/characters">Characters</a>
                    </li>
                    /
                    <li>
                        <a href="/comics">Comics</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader
