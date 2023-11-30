import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const TextInput = styled(TextField)({
  '& label': {
    color: '#f6d9b1',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#f6d9b1',
    },
  },
});
