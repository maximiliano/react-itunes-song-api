import React from 'react';
import './App.css';
import Title from './Title.js';
import SearchResult from './SearchResult.js';


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
        let url = "https://itunes.apple.com/search?media=music&entity=album&term="
        url += encodeURIComponent(this.state.query.replace(/ /g, "+"));

        console.log("getAlbums() => ", url);

        this.setState({
            title: this.state.query + " albums",
            entity: "album",
            loading: true
        })

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data.results)
                this.setState({
                    results: data.results,
                    loading: false
                })
            })
            .catch(console.log)
    }

    getSongs() {
        let url = "https://itunes.apple.com/search?media=music&entity=song&term="
        url += encodeURIComponent(this.state.query.replace(/ /g, "+"));

        console.log("getSongs() => ", url);

        this.setState({
            title: this.state.query + " songs",
            entity: "song",
            loading: true
        })

        fetch(url)
          .then(response => response.json())
          .then((data) => {
            console.log(data.results)
            this.setState({
              results: data.results,
              loading: false
            })
          })
          .catch(console.log)
    }

    getAlbumSongs(collectionId, collectionName) {
        let url = "https://itunes.apple.com/lookup?media=music&entity=song&id=";
        url += collectionId;

        this.setState({
            title: collectionName + " songs",
            entity: "song",
            loading: true
        })

        // First element of result is album meta info, we remove it before setting state
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data.results)
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
