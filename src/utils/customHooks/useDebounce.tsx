import {useEffect, useState} from 'react';

const useDebounce = (inputText, delay) => {
  const [debouncedText, setDebouncedText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(inputText);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inputText]);
  return debouncedText;
};

export default useDebounce;
