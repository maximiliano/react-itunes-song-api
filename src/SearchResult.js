import React from 'react';


class SearchResult extends React.Component {
    showHeader() {
        if (this.props.entity === "album") {
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
                <th>Disc #</th>
                <th>Track #</th>
                <th>Song</th>
                <th>Album</th>
                <th>Artist</th>
            </tr>
        )
    }

    showContent() {
        if (this.props.entity === "album") {
            return this.props.results.map((album, index) => (
                <Album
                  key={index}
                  album={album}>
                </Album>
            ));
        }

        return this.props.results.map((song, index) => (
            <Song
              key={index}
              song={song}>
            </Song>
        ));
    }

    render() {
        if (this.props.loading) {
            return <img src="loading.gif" alt="loading" />;
        }

        if (this.props.results.length === 0 || this.props.empty_search) {
            return (
                <div>
                    <p>Nothing to show</p>
                </div>
            )
        }

        return (
            <div>
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
}

class Song extends React.Component {
    render() {
        return (
            <tr>
                <td><img src={this.props.song.artworkUrl60} alt="album cover" /></td>
                <td>{this.props.song.discNumber}</td>
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


export default SearchResult;

