import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { Demo } from './ContactListDemo.styled';
import { ContactItem } from 'components/ContactItem/ContactItem';

export const ContactList = ({ contacts, onDeleteButtonClick }) => (
  <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
    <Grid item xs={12} md={6}>
      <Demo>
        <List>
          {contacts.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          ))}
        </List>
      </Demo>
    </Grid>
  </Box>
);
