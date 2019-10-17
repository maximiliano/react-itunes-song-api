import React from 'react';
import './App.css';
import Title from './Title.js';
import SearchResult from './SearchResult.js';


const SEARCH_URL = "https://itunes.apple.com/search?";
const LOOKUP_URL = "https://itunes.apple.com/lookup?";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            title: "",
            entity: "",
            results: [],
            nothing_found: false,
            loading: false,
        };

        this.getSongs = this.getSongs.bind(this);
        this.getAlbums = this.getAlbums.bind(this);
        this.getAlbumSongs = this.getAlbumSongs.bind(this);
        this.changeQuery = this.changeQuery.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    changeQuery(event) {
        this.setState({
            query: event.target.value
        })
    }

    clearSearch() {
        this.setState({
            query: "",
            title: "",
            results: [],
            nothing_found: false,
        })
    }

    getAlbums() {
        let urlParams = "media=music&entity=album&limit=200&term="
        urlParams += encodeURIComponent(this.state.query.replace(/ /g, "+"));

        this.setState({
            title: this.state.query + " albums",
            entity: "album",
            loading: true
        })

        fetch(SEARCH_URL + urlParams)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    results: data.results,
                    nothing_found: data.results.length === 0,
                    loading: false
                })
            })
            .catch(console.log)
    }

    getSongs() {
        let urlParams = "media=music&entity=song&limit=200&term="
        urlParams += encodeURIComponent(this.state.query.replace(/ /g, "+"));

        this.setState({
            title: this.state.query + " songs",
            entity: "song",
            loading: true
        })

        fetch(SEARCH_URL + urlParams)
          .then(response => response.json())
          .then((data) => {
            this.setState({
              results: data.results,
              nothing_found: data.results.length === 0,
              loading: false
            })
          })
          .catch(console.log)
    }

    getAlbumSongs(collectionId, collectionName) {
        let urlParams = "media=music&entity=song&limit=200&id=";
        urlParams += collectionId;

        this.setState({
            title: collectionName + " songs",
            entity: "song",
            loading: true
        })

        // First element of result is album meta info, we remove it before setting state
        fetch(LOOKUP_URL + urlParams)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    results: data.results.slice(1),
                    loading: false
                })
            })
            .catch(console.log)
    }

    render() {
        return (
          <div className="home">

            <h1>Music Search</h1>

            <div className="header">
                <div className="search-container">
                    <input
                      className="search-box"
                      type="text"
                      value={this.state.query}
                      onChange={this.changeQuery}
                      placeholder="Artist, Song, Album..."
                    />
                </div>

                <div className="buttons-container">
                    <button className="search-button" onClick={this.getAlbums}>
                      Get Albums
                    </button>

                    <button className="search-button" onClick={this.getSongs}>
                      Get Songs
                    </button>

                    <button className="search-button" onClick={this.clearSearch}>
                      Clear Search
                    </button>
                </div>
            </div>

            <Title title={this.state.title} />

            <SearchResult
              entity={this.state.entity}
              loading={this.state.loading}
              nothing_found={this.state.nothing_found}
              results={this.state.results}
              getAlbumSongs={this.getAlbumSongs}
            />


            <footer>© 2019 Maximiliano Medeiros</footer>
          </div>
        );
    }
}

export default App;
