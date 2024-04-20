import {ChangeEvent, useState} from 'react';

const useInput = (initialVal: string) => {
  const [value, setValue] = useState(initialVal)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target?.value);
  }

  return [value, handleChange];

}

export default useInput;