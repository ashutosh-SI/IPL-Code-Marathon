import React, { useState } from 'react';
import { addPlayer } from '../services/apiservices';
import '../styles/styles.css'; 

const AddPlayer = () => {
  const [player, setPlayer] = useState({
    playerName: '',
    teamId: '',
    role: '',
    age: '',
    matchesPlayed: '',
    team: {
      teamId: '',
      teamName: '',
      coach: '',
      homeGround: '',
      foundedYear: '',
      owner: ''
    }
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlayer(player);
      setSuccess('Player added successfully!');
      setError('');
    } catch (err) {
      setError('Failed to add player. Please check your input.');
      setSuccess('');
    }
  };

  return (
    <div className="add-player">
      <h2>Add New Player</h2>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input
            type="text"
            name="playerName"
            value={player.playerName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Team ID:
          <input
            type="number"
            name="teamId"
            value={player.teamId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={player.role}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={player.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Matches Played:
          <input
            type="number"
            name="matchesPlayed"
            value={player.matchesPlayed}
            onChange={handleChange}
            required
          />
        </label>
        <fieldset>
          <legend>Team Details</legend>
          <label>
            Team ID:
            <input
              type="number"
              name="teamId"
              value={player.team.teamId}
              onChange={handleTeamChange}
              required
            />
          </label>
          <label>
            Team Name:
            <input
              type="text"
              name="teamName"
              value={player.team.teamName}
              onChange={handleTeamChange}
              required
            />
          </label>
          <label>
            Coach:
            <input
              type="text"
              name="coach"
              value={player.team.coach}
              onChange={handleTeamChange}
              required
            />
          </label>
          <label>
            Home Ground:
            <input
              type="text"
              name="homeGround"
              value={player.team.homeGround}
              onChange={handleTeamChange}
              required
            />
          </label>
          <label>
            Founded Year:
            <input
              type="number"
              name="foundedYear"
              value={player.team.foundedYear}
              onChange={handleTeamChange}
              required
            />
          </label>
          <label>
            Owner:
            <input
              type="text"
              name="owner"
              value={player.team.owner}
              onChange={handleTeamChange}
              required
            />
          </label>
        </fieldset>
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayer;
