import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type Props = {
   isWorking: boolean,
   isPaused: boolean,
   isBreak: boolean,
   onStartPause: VoidFunction,
   onStop: VoidFunction,
};

export const TimerButton = ({
   isWorking,
   isPaused,
   isBreak,
   onStartPause,
   onStop,
}: Props) => {

   return (
      <Stack sx={{
         display: 'flex',
         direction: 'row',
         justifyContent: 'center',
         alignItems: 'center'
      }}
      >
         {!isWorking && !isPaused
            ? <Button onClick={onStartPause}>Start</Button>
            : !isPaused
               ? <Button onClick={onStartPause}>
                  {!isBreak ? "Pause" : "Skip break"}
               </Button>
               : <Box>
                  <Button onClick={onStartPause}>Continue</Button>
                  <Button onClick={onStop}>Stop</Button>
               </Box>
         }
      </Stack >
   );
}
