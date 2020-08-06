import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#475f8c',
    color: '#ffffff',
    fontSize: '23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span>Hello React! :)</span>
    </div>
  );
}

export default App;
