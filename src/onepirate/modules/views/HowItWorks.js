import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(8),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: '#d9442f',
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
  link: {
    textDecoration: "none",
  },  br: {
    marginTop: 50,
    marginBottom: 40,
    width : '30%',
    height : 2,
    backgroundColor: '#d9442f',
    margin: 'auto'
  },
  info:{
    marginBottom: 20,
  }
});

function HowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root} name="HowItWorks">
      <Container className={classes.container}>
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Comment ça marche ?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src="/images/icon_coordonnee.png"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Vous exprimez votre besoin ou renseignez ce que vous souhaitez donner en prenant contact avec nous (en rentrant vos coordonnées dans le formulaire ci-dessous afin d’être recontacté).
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src="/images/icon_plan.png"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Nous étudions la faisabilité de votre projet et vous recontactons afin de vous faire part des modalités d'exécution du service. Concernant les dons alimentaires, nous enregistrons votre promesse de don jusqu’à ce qu’un preneur se manifeste.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src="/images/icon_help.png"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Nous planifions ensemble un rendez-vous (avec le bénévole le plus proche de chez vous).
                  Nous sommes votre interlocuteur unique, toutes les demandes sont centralisées par notre équipe.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
            <Grid item xs={12}>
              <div className={classes.br} ></div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h6" align="center" className={classes.info}>
                  Information COVID-19
                </Typography>

                <Typography variant="h5" align="center">
                  Soyez rassurés, nos équipes s'engagent à respecter l'ensemble des gestes barrières mis en place par le gouvernement.
                  Votre bien-être est notre priorité.
                </Typography>
              </div>
            </Grid>
            </Grid>
        </div>
        <Link
            className={classes.link}
            activeClass="active" to="ContactForm" spy={true} smooth={true} offset={0} duration={500}
                href="#"
            >
          <Button
            color="secondary"
            size="large"
            variant="contained"
            className={classes.button}
            component="a"
          >

              {'Je prends contact'}
          </Button>
        </Link>
      </Container>
    </section>
  );
}

HowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowItWorks);
