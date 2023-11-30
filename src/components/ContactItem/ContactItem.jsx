import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export const ContactItem = ({ id, name, number, onDeleteButtonClick }) => (
  <ListItem
    secondaryAction={
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onDeleteButtonClick(id)}
      >
        <DeleteIcon color="primary" />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <Avatar sx={{ backgroundColor: '#f6d9b1', color: '#252525' }}>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={number}
      primaryTypographyProps={{ color: '#f6d9b1' }}
      secondaryTypographyProps={{ color: '#dca75d' }}
      sx={{ textTransform: 'capitalize' }}
    />
  </ListItem>
);
