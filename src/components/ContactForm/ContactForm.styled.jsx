import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

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
