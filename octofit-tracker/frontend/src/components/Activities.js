import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) throw new Error('Failed to fetch activities');
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Processed activities list:', activitiesList);
        
        setActivities(activitiesList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Container className="component-container text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading Activities...</p>
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
      <h2 className="mb-4">🏃 User Activities</h2>
      {activities.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="mb-4">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (minutes)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="fw-bold">{activity.user}</td>
                  <td>{activity.activity}</td>
                  <td>
                    <span className="badge bg-info">{activity.duration}</span>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      View
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="info">No activities found.</Alert>
      )}
    </Container>
  );
}

export default Activities;
