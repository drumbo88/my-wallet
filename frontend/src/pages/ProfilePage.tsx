import { useState } from 'react';
import { Avatar, Box, Button, Grid, TextField, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  sectionTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  sectionText: {
    marginBottom: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    jobTitle: 'Software Developer',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget posuere odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum sit amet velit sed mi efficitur posuere.',
    skills: 'HTML, CSS, JavaScript, React, Node.js, Express, MongoDB',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA',
  });

  const handleChange = (prop) => (event) => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  return (
    <Box className={classes.root}>
      <Paper elevation={3}>
        <Box p={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar className={classes.avatar} src="/profile.jpg" alt="Profile Picture" />
            </Grid>
            <Grid item>
              <Typography variant="h4">{profile.name}</Typography>
              <Typography variant="subtitle1">{profile.jobTitle}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box px={3}>
          <Typography className={classes.sectionTitle} variant="h5">About Me</Typography>
          <Typography className={classes.sectionText} variant="body1">{profile.bio}</Typography>
        </Box>
        <Box px={3}>
          <Typography className={classes.sectionTitle} variant="h5">Skills</Typography>
          <Typography className={classes.sectionText} variant="body1">{profile.skills}</Typography>
        </Box>
        <Box px={3}>
          <Typography className={classes.sectionTitle} variant="h5">Contact</Typography>
          <TextField
            className={classes.sectionText}
            label="Email"
            variant="outlined"
            value={profile.email}
            onChange={handleChange('email')}
          />
          <TextField
            className={classes.sectionText}
            label="Phone"
            variant="outlined"
            value={profile.phone}
            onChange={handleChange('phone')}
          />
          <TextField
            className={classes.sectionText}
            label="Address"
            variant="outlined"
            value={profile.address}
            onChange={handleChange('address')}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
