import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = name.trim();
    const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());

    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    if (exists) {
      setError('Name must be unique.');
      return;
    }

    const newProfile = { id: Date.now(), name: trimmed, likes: 0 };
    setPeople([...people, newProfile]);
    setName('');
    setError('');
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* Add Profile Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            isInvalid={!!error}
            placeholder="Enter profile name"
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>

      {/* Profiles Grid */}
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard
              name={p.name}
              likes={p.likes}
              onLike={() =>
                setPeople(ps =>
                  ps.map(person =>
                    person.id === p.id
                      ? { ...person, likes: person.likes + 1 }
                      : person
                  )
                )
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
