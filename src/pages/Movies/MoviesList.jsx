import { StyledLinkList } from '../../components/linkStyled';
import { useLocation } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      {movies.map(movie => (
        <li key={movie.id}>
          <StyledLinkList to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title || movie.name || movie.original_title}
          </StyledLinkList>
        </li>
      ))}
    </>
  );
};

export default MoviesList;
