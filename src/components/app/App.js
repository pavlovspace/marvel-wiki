import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { MainPage, ComicsPage, Page404 } from '../pages'
import AppHeader from '../appHeader/AppHeader'

class App extends Component {
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
            <Router>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage />} />

                            <Route path="/comics" element={<ComicsPage />} />

                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        )
    }
}

export default App
