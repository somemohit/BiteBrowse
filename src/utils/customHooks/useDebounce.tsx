import {useEffect, useState} from 'react';

const useDebounce = (inputText: string, delay: number): string => {
  const [debouncedText, setDebouncedText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(inputText);
    }, delay);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);
  return debouncedText;
};

export default useDebounce;
