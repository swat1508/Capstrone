import React from "react";
import useDataFetching from "../../HOC/UseDataFetching";

function RepositoriesHooks() {
  const { loading, results, error } = useDataFetching(
    "https://api.github.com/users/royderks/repos"
  );

  if (loading || error) {
    return loading ? "Loading..." : error.message;
  }

  return (
    <ul>
      {results.map(({ id, html_url, full_name }) => (
        <li key={id}>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {full_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default RepositoriesHooks;