import React, { useEffect, useState } from 'react';
import { getMatchDetailsWithFanEngagement } from '../services/apiservices';
import '../styles/styles.css'; 

const MatchDetails = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const data = await getMatchDetailsWithFanEngagement();
        console.log("Fetched Match Data:", data);  
        setMatches(data);  
      } catch (err) {
        console.error("Failed to fetch match details:", err);  
        setError('Failed to fetch match details.');
      }
    };

    fetchMatchDetails();
  }, []);

  return (
    <div className="match-details">
      <h2>Match Details with Fan Engagements</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Match Date</th>
            <th>Venue</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Total Engagements</th>
          </tr>
        </thead>
        <tbody>
          {matches && matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td>{match.matchDate ? new Date(match.matchDate).toLocaleDateString() : 'Invalid Date'}</td>
                <td>{match.venue || 'N/A'}</td>
                <td>{match.team1 || 'N/A'}</td>
                <td>{match.team2 || 'N/A'}</td>
                <td>{match.totalEngagements || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No match details available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchDetails;
