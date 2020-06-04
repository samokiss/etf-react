import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../components/Typography';
import Card from "../components/Card";
import Grid from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';


const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light,
    }, paper: {
        padding: theme.spacing(2), textAlign: 'center', color: theme.palette.text.secondary,
    }, container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(10),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, title: {
        margin: theme.spacing(0, 0, 5, 0),
    }, card: {
        // maxWidth: '345px',
        margin: 'auto',
    }
}));

function Members (props) {
    const classes = styles();
    const matches = useMediaQuery('(min-width:960px)');

    return (<section className={classes.root} name={"Members"}>
        <Container className={classes.container}>
            <Grid container spacing={3}
                  direction={matches ? "row" : "column"}
                  justify="center"
                  alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h4" marked="center" align="center" component="h2">
                        Notre équipe
                    </Typography>
                </Grid>
                <Grid item md={4} xs={12} sm={6}>
                    <Card className={classes.card} justify="center" name={'Samuel Gomis'} content={'Fondateur'} image={'/images/IMG_5522.JPG'}
                          readMore={'Visionnaire du concept d\'Exprime Ta Foi©, je suis un homme engagée dans différent milieu, pourvu d\'une grande sensibilité envers ceux qui sont dans le besoin.\n'}/>
                </Grid>
                <Grid item md={4} xs={12} sm={6}>
                    <Card className={classes.card} justify="center" name={'Alex Pepin'} content={'Co-fondateur'} image={'/images/IMG_5515.JPG'}
                          readMore={'Moi c\'est Alex, entrepreneur social dans le domaine de l\'informatique, motivé par le désir de\n' + 'démocratiser l\'accès à la formation de base aux outils numérique.'}/>
                </Grid>
                <Grid item md={4} xs={12} sm={6}>
                    <Card className={classes.card} justify="center" name={'Laia Gomis'} content={'Membre'} image={'/images/IMG_5517.JPG'}
                          readMore={'Je suis une femme investie et empathique, je soutiens la vision d\'Exprime Ta Foi et contribue à son développement.'}/>
                </Grid>
            </Grid>
        </Container>
    </section>);
}

Members.propTypes = {classes: PropTypes.object.isRequired,};

export default Members;
