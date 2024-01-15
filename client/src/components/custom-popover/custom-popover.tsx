import Popover from '@mui/material/Popover';

import { MenuPopoverProps } from '../../types/custom-popover';

// ----------------------------------------------------------------------

export const CustomPopover = ({
  open,
  children,
  sx,
  ...other
}: MenuPopoverProps) => {

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      // anchorOrigin={anchorOrigin as PopoverOrigin}
      // transformOrigin={transformOrigin as PopoverOrigin}
      slotProps={{
        paper: {
          sx: {
            width: 'auto',
            overflow: 'inherit',
            ...sx,
          },
        },
      }}
      {...other}
    >

      {children}
    </Popover>
  );
}
