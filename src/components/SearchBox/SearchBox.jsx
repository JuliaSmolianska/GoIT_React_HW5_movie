import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import css from './SearchBox.module.css';

const SearchBox = ({ onSubmit }) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  const handleInputFocus = evt => {
    evt.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className={css.search_form}>
      <input
        className={css.search_input}
        type="text"
        placeholder="Enter a movie title"
        name="query"
        value={query}
        onChange={handleChange}
        onFocus={handleInputFocus}
      />
      <button type="submit" className="search_button">
        <BiSearch size={25} />
      </button>
    </form>
  );
};

export default SearchBox;
