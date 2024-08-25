import React, { useState } from 'react';
import { getTopPlayersWithHighestFanEngagement } from '../services/apiservices'; 
import '../styles/styles.css'; 

const TopPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [numPlayers, setNumPlayers] = useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTopPlayers = async () => {
    if (numPlayers <= 0) {
      setError('Number of players must be greater than 0.');
      return;
    }
    setLoading(true);
    try {
      const data = await getTopPlayersWithHighestFanEngagement(numPlayers);
      setPlayers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch top players.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNumPlayers(e.target.value);
  };

  return (
    <div className="top-players">
      <h2>Top Players with Highest Fan Engagement</h2>
      <div className="input-group">
        <label htmlFor="numPlayers">Number of Top Players:</label>
        <input
          type="number"
          id="numPlayers"
          value={numPlayers}
          min="1"
          onChange={handleChange}
          disabled={loading}
        />
        <button onClick={fetchTopPlayers} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Players'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Team ID</th>
            <th>Role</th>
            <th>Age</th>
            <th>Matches Played</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player, index) => (
              <tr key={index}>
                <td>{player.playerName}</td>
                <td>{player.teamId}</td>      
                <td>{player.role}</td>        
                <td>{player.age}</td>         
                <td>{player.matchesPlayed}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No players available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopPlayers;
