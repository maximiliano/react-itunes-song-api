import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            albums: [],
            songs: [],
            entity: "",
            empty_search: true,
        };

        this.getSongs = this.getSongs.bind(this);
        this.getAlbums = this.getAlbums.bind(this);
        this.showHeader = this.showHeader.bind(this);
        this.showContent = this.showContent.bind(this);
        this.showResult = this.showResult.bind(this);
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
            songs: [],
            albums: [],
            empty_search: true,
        })
    }

    getAlbums() {
        let url = "https://itunes.apple.com/search?media=music&entity=album&term="
        url += encodeURIComponent(this.state.query.replace(/ /g, "+"));

        console.log("getAlbums() => ", url);

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data.results)
                this.setState({
                    entity: "album",
                    albums: data.results
                })
            })
            .catch(console.log)
    }

    getSongs() {
        let url = "https://itunes.apple.com/search?media=music&entity=song&term="
        url += encodeURIComponent(this.state.query.replace(/ /g, "+"));

        console.log("getSongs() => ", url);

        fetch(url)
          .then(response => response.json())
          .then((data) => {
            console.log(data.results)
            this.setState({
              entity: "song",
              songs: data.results
            })
          })
          .catch(console.log)
    }

    showHeader() {
        if (this.state.entity === "album") {
            return (
                <tr>
                    <th>Cover</th>
                    <th>Album</th>
                    <th>Artist</th>
                    <th>Genre</th>
                    <th>Songs</th>
                    <th>Year</th>
                </tr>
            )
        }

        return (
            <tr>
                <th>Cover</th>
                <th>Number</th>
                <th>Song</th>
                <th>Album</th>
                <th>Artist</th>
            </tr>
        )
    }

    showContent() {
        if (this.state.entity === "album") {
            return this.state.albums.map((album, index) => (
                <Album
                  key={index}
                  album={album}>
                </Album>
            ));
        }

        return this.state.songs.map((song, index) => (
            <Song
              key={index}
              song={song}>
            </Song>
        ));
    }

    showResult() {
        if ((this.state.entity === "song" && this.state.songs.length === 0) ||
            (this.state.entity === "album" && this.state.albums.length === 0) ||
            (this.state.empty_search)) {

            return (
                <div>
                    <p>Nothing to show</p>
                </div>
            )
        }

        return (
            <div>
                <h1>Results:</h1>
                <hr />

                <table>
                    <thead>
                        {this.showHeader()}
                    </thead>
                    <tbody>
                        {this.showContent()}
                    </tbody>
                </table>
            </div>
        )
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

            {this.showResult()}
          </div>
        );
    }
}

class Song extends React.Component {
    render() {
        return (
            <tr>
                <td><img src={this.props.song.artworkUrl60} alt="album cover" /></td>
                <td>{this.props.song.trackNumber}</td>
                <td>{this.props.song.trackName}</td>
                <td>{this.props.song.collectionName}</td>
                <td>{this.props.song.artistName}</td>
            </tr>
        );
    }
}

class Album extends React.Component {
    render() {
        return (
            <tr>
                <td><img src={this.props.album.artworkUrl60} alt="album cover" /></td>
                <td>{this.props.album.collectionName}</td>
                <td>{this.props.album.artistName}</td>
                <td>{this.props.album.primaryGenreName}</td>
                <td>{this.props.album.trackCount}</td>
                <td>{this.props.album.releaseDate.slice(0, 4)}</td>
            </tr>
        );
    }
}

export default App;
