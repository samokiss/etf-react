import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'black', paddingTop: theme.spacing(8), paddingBottom: theme.spacing(8),
    }, container: {
        display: 'flex',
    }, paper: {
        height: 75, width: 75,
    }, control: {
        padding: theme.spacing(2),
    }, facebook: {
        fontSize: 50, color: '#3b5998',
    }, twitter: {
        fontSize: 50, color: '#00aced'
    }, instagram: {
        fontSize: 50, color: '#8a3ab9',
    }, youtube: {
        fontSize: 50, color: '#bb0000',
    }, line: {
        borderTop: 'solid', marginTop: 15, color: 'white',
    }, link: {
        margin: theme.spacing(1, 2, 3, 1),
        color: 'white',
        fontSize : '16px',
        fontWeight: theme.typography.fontWeightMedium,
    }
}));

function Copyright () {
    return (<React.Fragment>
        <span style={{color: 'white'}}>{'© '}Exprime Ta Foi - {new Date().getFullYear()}</span>
    </React.Fragment>);
}

export default function SpacingGrid () {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();


    return (<Typography component="footer" className={classes.root}>
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>
                        <Grid key={1} item>
                            <Link href="https://www.facebook.com/exprimetafoi">
                                <FacebookIcon className={classes.facebook}/>
                            </Link>
                        </Grid>
                        <Grid key={2} item>
                            <Link href="https://twitter.com/exprimetafoi">
                                <TwitterIcon className={classes.twitter}/>
                            </Link>
                        </Grid>
                        <Grid key={3} item>
                            <Link href="https://www.instagram.com/exprimetafoi">
                                <InstagramIcon className={classes.instagram}/>
                            </Link>
                        </Grid>
                        <Grid key={4} item>
                            <Link href="https://www.youtube.com/channel/UCSrY37mnEwKp8TghRBkt70g">
                                <YouTubeIcon className={classes.youtube}/>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={4}>
                        <Link href="/CGU.pdf" className={classes.link}>
                            CGU
                        </Link>
                        <span className={classes.link}>|</span>
                        <Link href="/A_PROPOS.pdf" className={classes.link}>
                            À propos
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={4}>
                        <Grid key={1} item className={classes.line}>
                            <Copyright/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </Typography>);
}
