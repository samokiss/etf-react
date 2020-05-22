import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    images: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        position: 'relative',
        display: 'block',
        padding: 0,
        borderRadius: 0,
        height: '50vh',
        [theme.breakpoints.down('sm')]: {
            width: '50% !important',
        },
        [theme.breakpoints.down('xs')]: {
            height: '60vh !important',
            width: '80% !important',
            margin: 'auto'
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.5,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

function MoralValues(props) {
    const { classes } = props;
    const matches = useMediaQuery('(min-width:960px)');

    const images = [
        {
            url:
                '/images/1.png',
            title: 'Confiance',
            width: '25%',
        },
        {
            url:
                '/images/2.png',
            title: 'Solidarité',
            width: '25%',
        },
        {
            url:
                '/images/3.png',
            title: 'Engagement',
            width: '25%',
        },
        {
            url:
                '/images/4.png',
            title: 'Amour',
            width: '25%',
        },
    ];

    return (
        <Container className={classes.root} component="section" name="MoralValues">
            <Typography id="nos_valeurs" variant="h4" marked="center" align="center" component="h2">
                Nos valeurs
            </Typography>
            <div className={classes.images}>
                {images.map((image) => (
                    <ButtonBase
                        key={image.title}
                        className={classes.imageWrapper}
                        style={{
                            width: image.width,
                        }}
                    >
                        <div
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <div className={classes.imageBackdrop} />
                        <div className={classes.imageButton}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.title}
                                <div className={classes.imageMarked} />
                            </Typography>
                        </div>
                    </ButtonBase>
                ))}
            </div>
        </Container>
    );
}

MoralValues.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoralValues);
