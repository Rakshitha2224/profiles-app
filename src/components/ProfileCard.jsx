import Card from 'react-bootstrap/Card';

export default function ProfileCard({ name, likes, onLike }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="h5 mb-1">{name}</Card.Title>
        <Card.Text className="mb-0">Likes: {likes}</Card.Text>
        <button className="btn btn-primary mt-2" onClick={onLike}>
          Like
        </button>
      </Card.Body>
    </Card>
  );
}
