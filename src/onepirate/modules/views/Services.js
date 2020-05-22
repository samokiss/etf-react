import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import Button from "../components/Button";
import {Link} from "react-scroll";

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 200,
  },
  imageBenevole: {
    height: 250,
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
  br: {
    marginTop: 50,
    marginBottom: 20,
    width : '30%',
    height : 2,
    backgroundColor: '#d9442f',
    margin: 'auto'
  },
  link: {
    textDecoration: "none",
  },
  button: {
    marginTop:20,
  },
  text: {
    textAlign: 'center',
  }
});

function Services(props) {
  const { classes } = props;

  return (
    <section className={classes.root} name="Services">
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src='/images/illu_courses.png'
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                Faire les courses
              </Typography>
              <Typography variant="h5" className={classes.text}>
                Nous vous proposons de faire les courses pour vous dans un rayon de 10km
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                  className={classes.image}
                  src="/images/illu_food.png"
                  alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Dons alimentaires
              </Typography>
              <Typography variant="h5" className={classes.text}>
                Nous Récoltons des produits alimentaires et/ou non-alimentaires qui ne sont plus utilisés mais sont encore en bon état pour les redistribuer aux nécessiteux
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/illu_help.png"
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
              Aide au devoir
              </Typography>
              <Typography variant="h5" className={classes.text}>
                Nous vous proposons de faire de l'aide au devoir en ligne
              </Typography>
            </div>
          </Grid>
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
            <Grid item xs={12}>
              <div className={classes.br} name="Volunteer"></div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <img
                  className={classes.imageBenevole}
                  src="/images/icon_benevole.png"
                  alt="graph"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <Typography variant="h5">
                  Dans le but d'avoir un plus grand impact, nous sommes à la recherche d'âme charitable partageant nos valeurs,
                  prêt à mettre leur temps à disposition pour nous accompagner dans cette aventure.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.item}>
                <Link
                    className={classes.link}
                    activeClass="active" to="ContactForm" spy={true} smooth={true} offset={0} duration={500}
                >
                  <Button
                      color="secondary"
                      size="large"
                      variant="contained"
                      className={classes.button}
                      component="a"
                  >

                    {'Devenir Bénévole'}
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

Services.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Services);
