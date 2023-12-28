import { useEffect, useRef } from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CustomPopover from './custom-popover/custom-popover';
import usePopover from '../hooks/use-popover';
import { Timer } from './Timer';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
   selectDisplayTime,
   selectMode,
   selectIsWorking,
   selectIsPausing,
   selectSettings,
   formatTimerTime,
   decrement,
   start,
   stopTimer,
} from '../features/timer/timerSlice';

import { formatPopoverTime } from '../utils/format-time';

export default function TimerPopover() {

   const time = useAppSelector(selectDisplayTime);
   const mode = useAppSelector(selectMode);
   const isWorking = useAppSelector(selectIsWorking);
   const settings = useAppSelector(selectSettings);
   const dispatch = useAppDispatch();

   //   const [timerColor, setTimerColor] = useState<string>('red'); // По умолчанию - красный

   const popover = usePopover();

   const timerIntervalRef = useRef<number | NodeJS.Timeout | null>(null);

   useEffect(() => {

      function decrementTime() {
         if (isWorking) {
            if (time > 0) {
               dispatch(decrement());
            } else {
               dispatch(stopTimer());
               clearInterval(timerIntervalRef.current as number);
            }
         }
      };

      // При изменении видимости Popover, если он ЗАКРЫВАЕТСЯ - запустить таймер
      if (!popover.open) {
         if (timerIntervalRef.current !== null) {
            clearInterval(timerIntervalRef.current as number);
         }

         timerIntervalRef.current = setInterval(decrementTime, 1000);
      }
         // Очистка интервала при размонтировании компонента TimerPopover
      return () => clearInterval(timerIntervalRef.current as number);

   }, [time, isWorking, dispatch, mode, settings, popover.open]);

   return (
      <>
         <Stack
            onClick={popover.onOpen}
            sx={{
               position: 'fixed',
               bottom: 50, left: '50%',
               transform: 'translateX(-50%)'
            }}>
            <IconButton
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 120,
                  height: 120,
                  borderRadius: '20%',
                  backgroundColor: mode === 'pomodoro' ? 'red' : 'blue',
               }}
            >
               <Typography variant="h3" color="#fff" >
                  {formatPopoverTime(time)}
               </Typography>

            </IconButton>
         </Stack>
         <CustomPopover
            open={popover.open}
            onClose={popover.onClose}
            anchorEl={popover.open}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            transformOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            sx={{
               height: '100%',
               width: '100%',
            }}
         >
            <Box
               sx={{
                  width: '100vw',
                  height: '100vh',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}

            >
               <Timer />
            </Box>
         </CustomPopover >
      </>
   );
};