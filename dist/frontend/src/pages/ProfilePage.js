"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const styles_1 = require("@mui/styles");
const useStyles = (0, styles_1.makeStyles)((theme) => ({
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
    const [profile, setProfile] = (0, react_1.useState)({
        name: 'John Doe',
        jobTitle: 'Software Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget posuere odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum sit amet velit sed mi efficitur posuere.',
        skills: 'HTML, CSS, JavaScript, React, Node.js, Express, MongoDB',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        address: '123 Main St, Anytown, USA',
    });
    const handleChange = (prop) => (event) => {
        setProfile(Object.assign(Object.assign({}, profile), { [prop]: event.target.value }));
    };
    return (<material_1.Box className={classes.root}>
      <material_1.Paper elevation={3}>
        <material_1.Box p={3}>
          <material_1.Grid container spacing={3} alignItems="center">
            <material_1.Grid item>
              <material_1.Avatar className={classes.avatar} src="/profile.jpg" alt="Profile Picture"/>
            </material_1.Grid>
            <material_1.Grid item>
              <material_1.Typography variant="h4">{profile.name}</material_1.Typography>
              <material_1.Typography variant="subtitle1">{profile.jobTitle}</material_1.Typography>
            </material_1.Grid>
            <material_1.Grid item>
              <material_1.Button variant="contained" color="primary">
                Edit Profile
              </material_1.Button>
            </material_1.Grid>
          </material_1.Grid>
        </material_1.Box>
        <material_1.Box px={3}>
          <material_1.Typography className={classes.sectionTitle} variant="h5">About Me</material_1.Typography>
          <material_1.Typography className={classes.sectionText} variant="body1">{profile.bio}</material_1.Typography>
        </material_1.Box>
        <material_1.Box px={3}>
          <material_1.Typography className={classes.sectionTitle} variant="h5">Skills</material_1.Typography>
          <material_1.Typography className={classes.sectionText} variant="body1">{profile.skills}</material_1.Typography>
        </material_1.Box>
        <material_1.Box px={3}>
          <material_1.Typography className={classes.sectionTitle} variant="h5">Contact</material_1.Typography>
          <material_1.TextField className={classes.sectionText} label="Email" variant="outlined" value={profile.email} onChange={handleChange('email')}/>
          <material_1.TextField className={classes.sectionText} label="Phone" variant="outlined" value={profile.phone} onChange={handleChange('phone')}/>
          <material_1.TextField className={classes.sectionText} label="Address" variant="outlined" value={profile.address} onChange={handleChange('address')}/>
        </material_1.Box>
      </material_1.Paper>
    </material_1.Box>);
};
exports.default = ProfilePage;
