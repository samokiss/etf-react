import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '../components/Typography';
import HeroLayout from './HeroLayout';

const backgroundImage = '/images/etf.mp4';

const styles = (theme) => ({
    background: {
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4), marginTop: theme.spacing(4), [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
    video: { width: '100%', zIndex: -1},
});

function Hero (props) {
    const {classes} = props;

    return (<HeroLayout backgroundClassName={classes.background}>
        <Typography color="inherit" align="center" variant="h2" marked="center">
            Exprime Ta Foi
        </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
            "Un plateforme créé par des jeunes chrétiens pour venir en aide à ceux qui en ont réellement besoin"
        </Typography>
        <Typography variant="body2" color="inherit" className={classes.more}>
            Ut enim ad minim veniam, quis nostrud exercitation
        </Typography>
    </HeroLayout>);
}

Hero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);
