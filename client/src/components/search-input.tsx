import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { useDebouncedState } from '../hooks/use-debounce-state';

type Props = {
   query: string,
   onSearch: (inputValue: string) => void,
};

export const SearchInput = ({
   query,
   onSearch,
   fullWidth = true,
   placeholder,
   ...other
}: Props & TextFieldProps) => {

   const [value, setValue] = useDebouncedState(query, onSearch);

   // console.log(query);

   return (
      <TextField
         fullWidth={fullWidth}
         type="search"
         value={value}
         placeholder="search task..."
         onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
         // sx={{ boderRadius: 6 }}
         InputProps={{
            startAdornment: (
               <InputAdornment position="start">
                  <SearchIcon />
               </InputAdornment>
            ),
            sx: { borderRadius: 2 }
         }}
         {...other}
      />
   );
}
