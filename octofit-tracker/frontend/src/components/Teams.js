import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) throw new Error('Failed to fetch teams');
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed teams list:', teamsList);
        
        setTeams(teamsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <Container className="component-container text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Teams...</p>
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

  return (
    <Container className="component-container">
      <h2 className="mb-4">👥 All Teams</h2>
      {teams.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="mb-4">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Members</th>
                <th>Member List</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td className="fw-bold">{team.name}</td>
                  <td>
                    <span className="badge bg-success">{team.members?.length || 0}</span>
                  </td>
                  <td>
                    {team.members && team.members.length > 0 ? (
                      <small>{team.members.join(', ')}</small>
                    ) : (
                      <small className="text-muted">No members yet</small>
                    )}
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      View
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="info">No teams found.</Alert>
      )}
    </Container>
  );
}

export default Teams;
