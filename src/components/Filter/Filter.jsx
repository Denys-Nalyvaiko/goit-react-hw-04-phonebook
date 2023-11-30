import { nanoid } from 'nanoid';
import { TextInput } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  const filterInputId = nanoid();

  return (
    <TextInput
      label="Find contacts by name"
      type="text"
      name="filter"
      id={filterInputId}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '32ch',
          input: { color: '#f6d9b1' },
          marginBottom: '20px',
        },
      }}
    />
  );
};
