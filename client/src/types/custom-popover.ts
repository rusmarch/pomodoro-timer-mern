import { PopoverProps } from '@mui/material/Popover';

// ----------------------------------------------------------------------

export interface MenuPopoverProps extends Omit<PopoverProps, 'open'> {
  open: HTMLElement | null;
}
