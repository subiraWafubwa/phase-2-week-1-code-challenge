import React from "react";

function Search({ setSeacrchValue, searchValue }) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchValue}
        onChange={(e) => setSeacrchValue(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
