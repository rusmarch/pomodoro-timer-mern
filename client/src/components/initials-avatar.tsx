import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { stringAvatar } from '../utils/avatar-name';

// ----------------------------------------------------------------------

type Props = AvatarProps & {
  title: string
};

export const InitialsAvatar = ({ title, ...other }: Props) => {

  return (
    <Avatar
      alt={title}
      {...stringAvatar(title)}
      {...other}
    />
  );
}
