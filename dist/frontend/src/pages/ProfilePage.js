"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@material-ui/core");
const styles_1 = require("@mui/styles");
const material_1 = require("@mui/material");
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
    return (<core_1.Box className={classes.root}>
      <material_1.Paper elevation={3}>
        <core_1.Box p={3}>
          <core_1.Grid container spacing={3} alignItems="center">
            <core_1.Grid item>
              <core_1.Avatar className={classes.avatar} src="/profile.jpg" alt="Profile Picture"/>
            </core_1.Grid>
            <core_1.Grid item>
              <core_1.Typography variant="h4">{profile.name}</core_1.Typography>
              <core_1.Typography variant="subtitle1">{profile.jobTitle}</core_1.Typography>
            </core_1.Grid>
            <core_1.Grid item>
              <core_1.Button variant="contained" color="primary">
                Edit Profile
              </core_1.Button>
            </core_1.Grid>
          </core_1.Grid>
        </core_1.Box>
        <core_1.Box px={3}>
          <core_1.Typography className={classes.sectionTitle} variant="h5">About Me</core_1.Typography>
          <core_1.Typography className={classes.sectionText} variant="body1">{profile.bio}</core_1.Typography>
        </core_1.Box>
        <core_1.Box px={3}>
          <core_1.Typography className={classes.sectionTitle} variant="h5">Skills</core_1.Typography>
          <core_1.Typography className={classes.sectionText} variant="body1">{profile.skills}</core_1.Typography>
        </core_1.Box>
        <core_1.Box px={3}>
          <core_1.Typography className={classes.sectionTitle} variant="h5">Contact</core_1.Typography>
          <core_1.TextField className={classes.sectionText} label="Email" variant="outlined" value={profile.email} onChange={handleChange('email')}/>
          <core_1.TextField className={classes.sectionText} label="Phone" variant="outlined" value={profile.phone} onChange={handleChange('phone')}/>
          <core_1.TextField className={classes.sectionText} label="Address" variant="outlined" value={profile.address} onChange={handleChange('address')}/>
        </core_1.Box>
      </material_1.Paper>
    </core_1.Box>);
};
exports.default = ProfilePage;
