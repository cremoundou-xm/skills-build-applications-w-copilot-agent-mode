import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed workouts list:', workoutsList);
        
        setWorkouts(workoutsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <Container className="component-container text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Workouts...</p>
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
      <h2 className="mb-4">💪 Personalized Workouts</h2>
      {workouts.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="mb-4">
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>Suggested For</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td className="fw-bold">{workout.name}</td>
                  <td>
                    {Array.isArray(workout.suggested_for) && workout.suggested_for.length > 0 ? (
                      <div>
                        {workout.suggested_for.map((user, idx) => (
                          <span key={idx} className="badge bg-primary me-1 mb-1">
                            {user}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <small className="text-muted">Not specified</small>
                    )}
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Start
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="info">No workouts found.</Alert>
      )}
    </Container>
  );
}

export default Workouts;
