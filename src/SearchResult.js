import React from 'react';


class SearchResult extends React.Component {
    showContent() {
        if (this.props.entity === "album") {
            return this.props.results.map((album, index) => (
                <Album
                  key={index}
                  album={album}
                  getAlbumSongs={this.props.getAlbumSongs}>
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

        if (this.props.nothing_found) {
            return (
                <div>
                    <p>Nothing found!</p>
                </div>
            )
        }

        return (
            this.showContent()
        )
    }
}

class Song extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-img"><img src={this.props.song.artworkUrl60} alt="album cover" /></div>
                <div className="card-content">

                    <p>{this.props.song.trackName}</p>
                    <p>{this.props.song.collectionName}</p>
                    <p>{this.props.song.artistName}</p>

                    <div className="card-footer">
                        <p>Disc #: {this.props.song.discNumber}</p>
                        <p>Track #: {this.props.song.trackNumber}</p>
                    </div>
                </div>
            </div>

        );
    }
}

class Album extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-img"><img src={this.props.album.artworkUrl60} alt="album cover" /></div>
                <div className="card-content">
                    <p><a
                      href="/#"
                      onClick={ e => this.props.getAlbumSongs(e, this.props.album.collectionId, this.props.album.collectionName)}>
                        {this.props.album.collectionName}</a></p>
                    <p>{this.props.album.artistName}</p>

                    <div className="card-footer">
                        <p>Songs: {this.props.album.trackCount}</p>
                        <p>Year: {this.props.album.releaseDate.slice(0, 4)}</p>
                        <p>Genre: {this.props.album.primaryGenreName}</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default SearchResult;

