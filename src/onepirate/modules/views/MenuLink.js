import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';


const styles = (theme) => ({
  link: {
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.common.black,
    marginLeft: theme.spacing(3),
    '&:hover': {
      color: "#f00",
    },
    '&:focus': {
      color: "#f00",
    },
//     marginTop : matches
  },
});

function MenuLink(props) {
  const { classes, isMobile } = props;
  const preventDefault = (event) => event.preventDefault();

  return (
      <>
        <Link
            activeClass="active" to="Services" spy={true} smooth={true} offset={0} duration={500}
            className={classes.link}
            style={{marginTop:isMobile?'10px':'0px'}}
        >
          {'Services'}
        </Link>
        <Link
            activeClass="active" to="Volunteer" spy={true} smooth={true} offset={-100} duration={500}
            className={classes.link}
            style={{marginTop:isMobile?'10px':'0px'}}
        >
          {'Devenir bénévole'}
        </Link>
        <Link
            className={classes.link}
            style={{marginTop:isMobile?'15px':'0px'}}
            activeClass="active" to="Members" spy={true} smooth={true} offset={-80} duration={500}
            onClick={preventDefault}
        >
          {"L'équipe"}
        </Link>
        <Link
            className={classes.link}
            style={{marginTop:isMobile?'10px':'0px'}}
            activeClass="active" to="MoralValues" spy={true} smooth={true} offset={-100} duration={500}

        >
          {'Nos valeurs'}
        </Link>
        <Link
            className={classes.link}
            style={{marginTop:isMobile?'10px':'0px'}}
            activeClass="active" to="HowItWorks" spy={true} smooth={true} offset={0} duration={500}
            onClick={preventDefault}
        >
          {'Comment ça marche?'}
        </Link>
        <Link
            className={classes.link}
            style={{marginTop:isMobile?'10px':'0px'}}
            activeClass="active" to="ContactForm" spy={true} smooth={true} offset={-10} duration={500}
            onClick={preventDefault}
        >
          {'Contactez-nous'}
        </Link>
        </>
  );
}

MenuLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuLink);
