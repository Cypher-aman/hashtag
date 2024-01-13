import { useEffect, useState } from 'react';

export default function useCountDown(timer: number) {
  const [count, setCount] = useState(timer);

  useEffect(() => {
    if (count > 0) {
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [count]);

  return { count, setCount };
}
