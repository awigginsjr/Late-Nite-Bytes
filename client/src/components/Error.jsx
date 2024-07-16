// src/components/errorpage.jsx

import { useRouteError } from "react-router-dom"; // `useRouteError` is a custom hook that returns the error object from the current route

export default function ErrorPage() { 
  const error = useRouteError(); 
  console.error(error); 

  return ( 
    <div id="error-page">
      <h1>Something went wrong!</h1>
      <p>We are sorry, an unexpected issue has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i> 
      </p>
    </div>
  );
}
