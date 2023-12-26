// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

//redux
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { selectSettings, setTimerSettings } from '../features/timer/timerSlice';
// import { TimerSettings } from '../../types/timerTypes';
// import { varHover } from 'src/components/animate';

import usePopover from '../hooks/use-popover';
import Popover from '@mui/material/Popover';
import { TimerSettings } from '../types/timerTypes';

// import { useSnackbar } from 'src/components/snackbar';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function SettingsPopover() {

  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  // const router = useRouter();
  // const { user } = useMockedUser();
  // const { logout } = useAuthContext();
  // const { enqueueSnackbar } = useSnackbar();

  const updateSettings = (
    time: keyof TimerSettings,
    multiplier: number
  ) => {
    dispatch(
      setTimerSettings({
        ...settings,
        [time]: settings[time] + multiplier,
      })
    );
  };

  const popover = usePopover();

  return (
    <>
      <IconButton
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <SettingsRoundedIcon color='error' />

      </IconButton>

      <Popover
        open={!!popover.open}
        onClose={popover.onClose}
        anchorEl={popover.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{ width: 500, p: 1 }}
      >

        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">
            Timer Settings
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Change working or brake time setttings here
          </Typography> */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={2}>
          <MenuList>
            <MenuItem>
              <Stack
                direction="row"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Pomodoro duration:
                </Typography>

                <Stack
                  direction="row"
                  alignItems="space-between"
                  justifyContent="space-between"
                >
                  <IconButton
                    onClick={() => updateSettings('pomodoroTime', -1)}
                    color='error'
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      px: .5,
                      py: 0,
                      border: 2,
                      borderRadius: 2,
                      borderColor: 'text.secondary'
                    }}
                    color="default"
                  >
                    {settings.pomodoroTime}
                  </Typography>

                  <IconButton
                    onClick={() => updateSettings('pomodoroTime', 1)}
                    color='error'
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>

              </Stack>
            </MenuItem>

            <MenuItem>
              <Stack
                direction="row"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Pomodoro duration:
                </Typography>

                <Stack
                  direction="row"
                  // justifyContent="space-between"
                  alignItems="space-between"
                  justifyContent="space-between"
                >
                  <IconButton
                    color='error'
                    onClick={() => updateSettings('breakTime', -1)}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      justifyContent: 'center',
                      px: .5,
                      border: 2,
                      borderRadius: 2,
                      borderColor: 'text.secondary'
                    }}
                    color="default"
                  >
                    {settings.breakTime}
                  </Typography>

                  <IconButton
                    color='error'
                    onClick={() => updateSettings('breakTime', 1)}
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>

              </Stack>
            </MenuItem>

          </MenuList>
        </Stack>

      </Popover >
    </>
  );
};
