import React, { useState } from 'react';
import { getMatchesByDateRange } from '../services/apiservices';
import '../styles/styles.css';

const MatchesByDateRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMatchesByDateRange = async () => {
    if (!startDate || !endDate) {
      setError('Both start date and end date are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getMatchesByDateRange(startDate, endDate);
      setMatches(data);
    } catch (err) {
      setError('Failed to fetch matches.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="matches-by-date-range">
      <h2>Matches by Date Range</h2>
      <div className="input-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={loading}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={loading}
        />
        <button onClick={fetchMatchesByDateRange} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Matches'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Match Date</th>
            <th>Venue</th>
            <th>Team 1 ID</th>
            <th>Team 2 ID</th>
            <th>Winner Team ID</th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 ? (
            matches.map((match) => (
              <tr key={match.matchId}>
                <td>{match.matchId}</td>
                <td>{match.matchDate}</td>
                <td>{match.venue}</td>
                <td>{match.team1Id}</td>
                <td>{match.team2Id}</td>
                <td>{match.winnerTeamId ? match.winnerTeamId : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No matches available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesByDateRange;
