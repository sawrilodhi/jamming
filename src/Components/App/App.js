import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults'
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(playlistTrack => playlistTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks });
  }

  // addTrack(track) {
  //   let tracks = this.state.playlistTracks;
  //   if (!tracks.find(playlistTrack => playlistTrack.id === track.id)) {
  //     this.setState(prevState => ({
  //       playlistTracks: [...prevState.playlistTracks, track]
  //     }));
  //   }
  // }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({playlistTracks: tracks });
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    if(this.state.playlistTracks.length !== 0){
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistTracks: [],
        });
        this.updatePlaylistName('My playlist');
        console.info(trackUris);
      });
    }
  }

  // savePlaylist() {
  //   const trackUris = this.state.playlistTracks.map(track => track.uri);
  //   if(this.state.playlistTracks.length !== 0){
  //     Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
  //       this.setState({
  //         playlistName: 'New Playlist',
  //         playlistTracks: []
  //       });
  //     });
  //   }
  // }

  // search(term) {
  //   Spotify.search(term).then(searchResults => this.setState({searchResults: searchResults}));
  // }
  
  search(term) {
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}

            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            /> 
            
          </div>
          <h3 style={{textAlign:'center',paddingTop: 40}}>
            @desined by 
            <a style={{color:'#6e6d8b', display: 'inline-block', textDecoration:'none'}} target='blank' href='https://github.com/damodhar918/jammming'>dj</a></h3>
        </div>
      </div>
    );
  }
}

export default App;