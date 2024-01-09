import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export const useDebouncedState = <T>(query: T, cb: (v: T) => void) => {
  const [value, setValue] = useState(query);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      cb(value);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [value, cb])

  return [value, setValue] as const;
}
