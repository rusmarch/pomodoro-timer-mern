// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

//redux
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
  selectSettings,
  setTimerSettings,
  selectIsWorking,
  selectIsPaused,
} from '../features/timer/timerSlice';
// import { varHover } from 'src/components/animate';

import { useTimeDisplay } from '../hooks/use-time-display';
import usePopover from '../hooks/use-popover';
import { TimerSettings } from '../types/timerTypes';
import CustomPopover from './custom-popover/custom-popover';

// import { useSnackbar } from 'src/components/snackbar';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function SettingsPopover() {

  const settings = useAppSelector(selectSettings);
  const isWorking = useAppSelector(selectIsWorking);
  const isPaused = useAppSelector(selectIsPaused);
  const dispatch = useAppDispatch();

  const settingsDisabled = isWorking || isPaused;
  const { popoverTime } = useTimeDisplay();
  // const router = useRouter();
  // const { user } = useMockedUser();
  // const { logout } = useAuthContext();
  // const { enqueueSnackbar } = useSnackbar();

  const settingsList = [
    {
      name: 'pomodoroTime' as keyof TimerSettings,
      label: 'Pomodoro duration',
      value: settings.pomodoroTime,
    },
    {
      name: 'breakTime' as keyof TimerSettings,
      label: 'Break duration',
      value: settings.breakTime,
    },
  ];

  const updateSettings = (
    key: keyof TimerSettings,
    type: 'increment' | 'decrement'
  ) => {
    const value = type === 'increment' ? settings[key] + 1 : settings[key] - 1;
    const updatedSettings = { ...settings, [key]: value };
    dispatch(setTimerSettings(updatedSettings));

    if (!settingsDisabled) {
      // setDisplayTime(updatedSettings.pomodoroTime);
    }

    localStorage.setItem('timerSettings', JSON.stringify(updatedSettings));
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

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorEl={popover.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{ width: 250 }}
      >
        <Stack sx={{ pl: 1.5, py: 1 }} >
          <Box>
            <Typography variant="subtitle1">Timer Settings</Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Change working or brake time setttings here
          </Typography> */}
          </Box>

          <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

          <Stack spacing={1}>

            {settingsList.map((setting) => (
              <Stack
                key={setting.name}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {setting.label}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <IconButton
                    onClick={() => updateSettings(setting.name, 'decrement')}
                    disabled={settingsDisabled}
                    color='error'
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      px: .5,
                      py: 0,
                      // color: 'green',
                      // border: 2,
                      // borderRadius: 2,
                      // borderColor: 'text.secondary'
                    }}
                    color="text.secondary"
                  >
                    {setting.value}
                  </Typography>

                  <IconButton
                    onClick={() => updateSettings(setting.name, 'increment')}
                    disabled={settingsDisabled}
                    color='error'
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>

              </Stack>
              // </MenuItem>
            ))}
          </Stack>

        </Stack>
      </CustomPopover >
    </>
  );
};
