import { useState } from 'react';
import { HomePage } from './modules/HomePage/HomePage';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello team project</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <HomePage />
    </>
  );
};
