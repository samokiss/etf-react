import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '../components/Button';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',

    }, paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #d9442f',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '60% !important',
        [theme.breakpoints.down('sm')]: {
            width: '90% !important',
        },
    }, h4: {
        fontStyle: 'italic', color: '#d9442f',
    }
}));

export default function TransitionsModal () {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div>
        <Button type="button" onClick={handleOpen}
                color="secondary"
                size="large"
                variant="contained"
                component="a">
            Notre vision
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Un concept simple</h2>
                    <div className={classes.h4}>Une vision : manifester l’Amour au travers d’action simple.</div>
                    <div className={classes.h4}>Une mission : Toucher le plus grand nombre.</div>
                    <p id="transition-modal-description">
                        Le concept d'Exprime Ta Foi© est simple : permettre aux chrétiens de tout horizon et de toute
                        génération de pouvoir témoigner de leur foi de manière créative et pratique. Que ce soit une
                        action ponctuelle, une exhortation ou un projet d'envergure, ciblant une communauté ou le
                        monde entier, l'idée consiste à ce qu'au travers de ces actes, l'expression de notre foi
                        soit tangible et que d'autres personnes puissent être touché par cet Amour manifesté.
                    </p>
                </div>
            </Fade>
        </Modal>
    </div>);
}
