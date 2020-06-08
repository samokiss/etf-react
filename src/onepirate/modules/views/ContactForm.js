import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';
import {fire} from '../../../firebase';
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Popover from "@material-ui/core/Popover";


const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(10), marginBottom: 0, display: 'flex',
    }, cardWrapper: {
        zIndex: 1,
    }, card: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(8, 3),
    }, cardContent: {
        maxWidth: 600,
    }, textField: {
        width: '100%', marginTop: theme.spacing(1), marginBottom: theme.spacing(1),
    }, textFieldMessage: {
        width: '100%', marginTop: theme.spacing(1), marginBottom: theme.spacing(2),
    }, button: {
        width: '100%',
    }, zone: {
        fontStyle: 'italic', fontSize: '13px',
    }, title: {
        marginBottom: theme.spacing(4),
    }, subtitle: {
        fontSize: '15px', marginBottom: 10, align: 'center'
    }, link: {
        fontStyle: 'italic', fontSize: '13px', color: '#d9442f',
    }, cguText: {
        fontSize: '13px',
    }, typography: {
        padding: theme.spacing(2),
    },
});

function ContactForm (props) {
    const [values, setValues] = useState({
                                             name: "",
                                             email: "",
                                             city: "",
                                             message: "",
                                             service: "Devenir bénévole",
                                             cgu: false,
                                         });
    const handleChange = (prop) => (event) => {
        if ('cgu' === prop) {
            setCgu(event.target.checked);
            return;
        }
        setValues({...values, [prop]: event.target.value});
    };

    const {classes} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [cgu, setCgu] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [cityHelperText, setCityHelperText] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [messageHelperText, setMessageHelperText] = useState(false);

    const [messageSnackBar, setMessageSnackBar] = useState('');

    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        validator(event);
        if (values.name && values.email && values.city && values.message && cgu) {
            await fire.db.collection("Contacts").add({...values, date: new Date().toLocaleString()});
            console.log('success');
            setOpen(true);
            setMessageSnackBar("Merci " + values.name + "! Votre message a bien été envoyé. Un email vous sera également envoyé à l'adresse suivante: \"" + values.email + "\". À très Bientôt!");
            return;
        }

        console.log('error');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClosePop = () => {
        setAnchorEl(null);
    };

    const validator = (event) => {
        if (!values.name) {
            setNameError(true);
            setNameHelperText('Veuillez rentrer un nom valide');
        } else {
            setNameError(false);
            setNameHelperText(false);
        }
        if (!values.email) {
            setEmailError(true);
            setEmailHelperText('Veuillez rentrer une adresse mail valide');
        } else {
            setEmailError(false);
            setEmailHelperText(false);
        }
        if (!values.city) {
            setCityError(true);
            setCityHelperText('Veuillez rentrer une ville valide');
        } else {
            setCityError(false);
            setCityHelperText(false);
        }
        if (!values.message) {
            setMessageError(true);
            setMessageHelperText('Veuillez rentrer un message valide');
        } else {
            setMessageError(false);
            setMessageHelperText(false);
        }
        if (!cgu) {
            setAnchorEl(event.currentTarget);
        }
    };

    const cguText = <span className={classes.cguText}>
        En cochant cette case, je reconnais avoir pris connaissance des
        <Link href="/CGU.pdf" className={classes.link}>
            &nbsp;Conditions Générales d'Utilisation&nbsp;
        </Link>
         du site ainsi que sa Politique de Confidentialité et je les accepte.
    </span>;

    const openPop = Boolean(anchorEl);
    const id = openPop ? 'simple-popover' : undefined;

    return (<Container className={classes.root} component="section" name="ContactForm">
        <Grid container>
            <Grid item xs={12} md={12} className={classes.cardWrapper}>
                <div className={classes.card}>
                    <form onSubmit={handleSubmit} className={classes.cardContent}>
                        <Typography className={classes.title} variant="h4" marked="center" align="center" component="h2">
                            Contactez-nous
                        </Typography>
                        <Typography variant="h5" className={classes.subtitle}>
                            Rentrez vos coordonnées, nous prendrons contact avec vous rapidement.
                        </Typography>
                        <TextField error={nameError} helperText={nameHelperText} onChange={handleChange('name')} noBorder className={classes.textField} placeholder="Votre nom" value={values.name}/>
                        <TextField error={emailError} helperText={cityHelperText} onChange={handleChange('email')} noBorder className={classes.textField} placeholder="Votre email" value={values.email}/>
                        <TextField error={cityError} helperText={emailHelperText} onChange={handleChange('city')} noBorder className={classes.textField} placeholder="Votre Ville*" value={values.city}/>
                        <Typography className={classes.zone}>
                            (*) notre zone d'intervention actuelle : <span style={{fontWeight: 'bold',}}>Clamart</span>, <span style={{fontWeight: 'bold'}}>Saint-Cyr-l'Ecole</span> et leurs alentours.
                        </Typography>
                        <RadioGroup onChange={handleChange('service')} row aria-label="position" name="position" defaultValue="top" value={values.service}>
                            <FormControlLabel
                                value="Devenir bénévole"
                                control={<Radio color="primary"/>}
                                label="Devenir bénévole"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="Faire les courses"
                                control={<Radio color="primary"/>}
                                label="Faire les courses"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="Aide au devoirs"
                                control={<Radio color="primary"/>}
                                label="Aide au devoirs"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="Dons alimentaires"
                                control={<Radio color="primary"/>}
                                label="Faire un don alimentaire"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="Demande alimentaire"
                                control={<Radio color="primary"/>}
                                label="Je récolte des aliments"
                                labelPlacement="right"
                            />
                        </RadioGroup>
                        <TextField error={messageError} helperText={messageHelperText} onChange={handleChange('message')} noBorder className={classes.textFieldMessage} multiline rows={4} placeholder="Votre message" value={values.message}/>
                        <Popover
                            id={id}
                            open={openPop}
                            anchorEl={anchorEl}
                            onClose={handleClosePop}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>Veuillez accepter les conditions générales d'utilisation</Typography>
                        </Popover>
                        <FormControlLabel
                            control={
                                <Checkbox id="checkbox" aria-describedby={id} checked={cgu} onChange={handleChange('cgu')} value={cgu}/>}
                            label={cguText}
                            style={{paddingBottom: '20px'}}
                        />
                        <Button type="submit" color="primary" variant="contained" className={classes.button}>
                            Je prends contact
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
        <Snackbar
            open={open}
            onClose={handleClose}
            message={messageSnackBar}
        />
    </Container>);
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
