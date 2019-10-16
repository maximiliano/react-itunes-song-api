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
            empty_search: true,
            loading: false,
        };

        this.getSongs = this.getSongs.bind(this);
        this.getAlbums = this.getAlbums.bind(this);
        this.getAlbumSongs = this.getAlbumSongs.bind(this);
        this.changeQuery = this.changeQuery.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    changeQuery(event) {
        let query = event.target.value;

        this.setState({
            query: query,
            empty_search: query.trim().length === 0
        })
    }

    clearSearch() {
        this.setState({
            query: "",
            title: "",
            results: [],
            empty_search: true,
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
          <div>
            <h1>Search for Artist</h1>
            <input
              type="text"
              value={this.state.query}
              onChange={this.changeQuery}
              placeholder="Search for artist..."
            />

            <button onClick={this.getAlbums}>
              Get Albums
            </button>

            <button onClick={this.getSongs}>
              Get Songs
            </button>

            <button onClick={this.clearSearch}>
              Clear Search
            </button>

            <hr />
            <Title title={this.state.title} />

            <SearchResult
              entity={this.state.entity}
              loading={this.state.loading}
              empty_search={this.state.empty_search}
              results={this.state.results}
              getAlbumSongs={this.getAlbumSongs}
            />

          </div>
        );
    }
}

export default App;
