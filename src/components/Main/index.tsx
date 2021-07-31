import { FC, useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, Fab, SvgIcon, Button } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { TimerControlNames } from 'models/enums';

const StopWatch = dynamic(() => import('./components/index'), { ssr: false });

const useStyles = makeStyles(({ palette: { background, text }, spacing }) => ({
  container: {
    position: 'fixed',
    inset: 0,
    zIndex: 2
  },

  titleContainer: {
    color: text.secondary
    // marginBottom: spacing(10)
  },

  stopWatchContainer: {
    borderRadius: '50%',
    border: '8px solid',
    borderColor: text.secondary,
    width: spacing(60),
    height: spacing(60)
  },
  utilsContainer: {
    gap: 92,
    '& .MuiFab-root': {
      width: 92,
      height: 92
    }
  }
}));

const Main: FC = () => {
  const classes = useStyles();

  // const paths = {
  //   PLAY: 'M8,5.14V19.14L19,12.14L8,5.14Z',
  //   PAUSE: 'M14,19H18V5H14M6,19H10V5H6V19Z'
  // };

  return (
    <>
      <Grid
        container
        className={classes.container}
        justifyContent={'space-around'}
        alignItems={'center'}
        direction={'column'}
      >
        <Grid className={classes.titleContainer}>
          <Typography variant={'h1'}> {'Stop Watch'}</Typography>
        </Grid>
        <Grid container justifyContent={'center'} alignItems={'center'} className={classes.stopWatchContainer}>
          <Typography variant={'h2'} color={'textPrimary'} id={TimerControlNames.COUNTER}>
            <StopWatch />
          </Typography>
        </Grid>

        <Grid container justifyContent={'center'} alignItems={'center'} className={classes.utilsContainer}>
        <Button color={'primary'} size={'large'} variant={'contained'} id={TimerControlNames.START}>
            {'Start'}
          </Button>
          <Button id={TimerControlNames.STOP} size={'large'} variant={'contained'}>
            {'Stop'}
          </Button>
          <Button color={'primary'} size={'large'} variant={'outlined'} id={TimerControlNames.WAIT} >
            {'Wait'}
          </Button>
       

          <Button color={'secondary'} size={'large'} variant={'contained'} id={TimerControlNames.RESET}>
            {'Reset'}
          </Button>

          {/* <Fab color={'primary'} id={TimerControlNames.START}>
            <SvgIcon viewBox={'0 0 24 24'}>
              <path d={paths[true ? 'PAUSE' : 'PLAY']} />
            </SvgIcon>
          </Fab> */}
        
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
