import React from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search</label><br/>
      <input type="text" id="search" name="search" onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
