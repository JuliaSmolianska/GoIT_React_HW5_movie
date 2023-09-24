import { StyledLinkList } from '../../components/linkStyled';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { defaultImg } from 'components/defaultImg';
import 'bootstrap/dist/css/bootstrap.min.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <Row className="container-fluid d-flex justify-content-evenly">
      {movies.map(movie => (
        <Card
          style={{ width: '14rem' }}
          key={movie.id}
          className="p-0 m-2 bg-transparent border border-white"
        >
          <Card.Img
            variant="top"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
           
            width={100}
            height={300}
          />
          <Card.Body className="p-1">
            <Card.Title className="text-center">
              <StyledLinkList
                to={`/movies/${movie.id}`}
                state={{ from: location }}
              >
                {movie.title || movie.name || movie.original_title}
              </StyledLinkList>
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
};

export default MoviesList;
