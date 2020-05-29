import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import HamburgerMenu from "../views/HamburgerMenu";
import MenuLink from "../views/MenuLink";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';


const styles = (theme) => ({
  title: {
    fontSize: 24,
    color : theme.palette.common.black
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo: {
    width: '90px',
  }
});


function Menu(props) {
  const { classes } = props;
  const matches = useMediaQuery('(min-width:800px)');


  const menu = <AppBar position="fixed" style={{backgroundColor:'white'}}>
    <Toolbar className={classes.toolbar}>
      <Link
          activeClass="active" to="etf" spy={true} smooth={true} offset={-100} duration={500}
          className={classes.title}
      >
        <img className={classes.logo} src="/images/etf.png"/>
      </Link>
      <div className={classes.right}>

      <MenuLink/>
      </div>

    </Toolbar>
  </AppBar>;

  return (
    <div>
      {!matches ? <HamburgerMenu matches={matches}/> : menu}

      <div className={classes.placeholder} />
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
