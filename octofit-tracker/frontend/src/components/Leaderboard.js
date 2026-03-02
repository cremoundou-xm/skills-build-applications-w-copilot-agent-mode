import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge } from 'react-bootstrap';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed leaderboard list:', leaderboardList);
        
        // Sort by points descending
        const sorted = leaderboardList.sort((a, b) => b.points - a.points);
        setLeaderboard(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Container className="component-container text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Leaderboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="component-container">
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '⭐';
    }
  };

  const getBadgeVariant = (rank) => {
    switch (rank) {
      case 1:
        return 'warning';
      case 2:
        return 'secondary';
      case 3:
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <Container className="component-container">
      <h2 className="mb-4">🏆 Team Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="mb-4">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'table-' + ['warning', 'secondary', 'danger'][index] : ''}>
                  <td className="fw-bold text-center">
                    <span className="me-2">{getMedalEmoji(index + 1)}</span>
                    <Badge bg={getBadgeVariant(index + 1)}>{index + 1}</Badge>
                  </td>
                  <td className="fw-bold">{entry.team}</td>
                  <td>
                    <Badge bg="success" pill>
                      {entry.points} pts
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="info">No leaderboard data found.</Alert>
      )}
    </Container>
  );
}

export default Leaderboard;
