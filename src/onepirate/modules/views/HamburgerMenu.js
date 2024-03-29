import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuLink from './MenuLink';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }, appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }),
    }, appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }),
    }, menuButton: {
        marginRight: theme.spacing(2), color: 'black',
    }, hide: {
        display: 'none',
    }, drawer: {
        width: drawerWidth, flexShrink: 0,
    }, drawerPaper: {
        width: drawerWidth,
    }, drawerHeader: {
        display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), // necessary for content to be below app bar
        ...theme.mixins.toolbar, // justifyContent: 'flex-end',
    }, content: {
        flexGrow: 1, padding: theme.spacing(3), transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }), marginLeft: -drawerWidth,
    }, contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }), marginLeft: 0,
    }, arrow: {
        marginLeft: '60px',
    }, logo: {
        width: '90px',
    }, link: {
        display: 'inline-block', marginTop: 15,
    }
}));

export default function HamburgerMenu (matches) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (<div className={classes.root}>
        <CssBaseline/>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            style={{backgroundColor: 'white', minHeight: '70px'}}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Link
                    activeClass="active" to="etf" spy={true} smooth={true} offset={-100} duration={500}
                    className={classes.title}
                    onClick={handleDrawerClose}
                >
                    <img className={classes.logo} src="/images/etf.png"/>
                </Link>
                <IconButton className={classes.arrow} onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <MenuLink isMobile open={open} handleDrawerClose={handleDrawerClose}/>
        </Drawer>
    </div>);
}
