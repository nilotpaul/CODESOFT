import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 1000) {
  const [debouncedValue, setdebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setdebouncedValue(value), delay || 1000);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
