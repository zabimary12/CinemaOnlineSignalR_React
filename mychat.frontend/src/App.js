import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [youTubeLink, setYoutubeLink] = useState(null)
  const [playerState, setPlayerState ] = useState(false)

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44303/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });
      
      connection.on("ReceiveLink", (youtubeLinkFromServer) =>{
        setYoutubeLink(youtubeLinkFromServer);
      });

      connection.on("ReceivePlayerState", (playerStateFromServer) =>{
        setPlayerState(playerStateFromServer);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }
const sendYoutubeLink = async(youTubeLink) =>{
  try{
    await connection.invoke("SendYouTubeLink", youTubeLink);
  }catch(e){
    console.log(e);
  }
}

const sendPlayerState = async(playerState) => {
  try{await connection.invoke("SendPlayerState", playerState)}
  catch(e){
    console.log(e);
  }
}

  return <div className='app'>
    <h2>MyCinema</h2>
    <hr className='line' />
    {!connection
      ? <Lobby joinRoom={joinRoom} />
      : <Chat 
          sendMessage={sendMessage} 
          messages={messages} 
          users={users} 
          closeConnection={closeConnection} 
          sendYoutubeLink={sendYoutubeLink} 
          youTubeLink={youTubeLink} 
          playerState ={playerState}
          sendPlayerState ={sendPlayerState} />}
  </div>
}

export default App;
