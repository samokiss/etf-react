import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const styles = (theme) => ({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '80vh', minHeight: 500, maxHeight: 1300,
        },
        overflow: 'hidden',
    }, container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    }, background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    }, arrowDown: {
        position: 'absolute', bottom: theme.spacing(4),
    }, hero: {
        height: '100%',
    }, bgvideo: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        zIndex: '-100',
        msTransform: 'translateX(-50%) translateY(-50%)',
        mozTransform: 'translateX(-50%) translateY(-50%)',
        webkitTransform: 'translateX(-50%) translateY(-50%)',
        transform: 'translateX(-50%) translateY(-50%)',
    }

});

function HeroLayout (props) {
    const {children, classes} = props;
    const matches = useMediaQuery('(min-width:960px)');


    return (<section className={classes.root}>
        <Container className={classes.container}>
            {children}
            <div className={classes.backdrop}/>

            <div className={classes.hero}>
                <video id='video' playsinline autoPlay muted loop className={classes.bgvideo} width="x" height="y">
                    <source src="/images/etf.mp4" type="video/mp4"></source>
                </video>
            </div>

        </Container>
    </section>);
}

HeroLayout.propTypes = {
    backgroundClassName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeroLayout);
