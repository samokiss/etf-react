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
        maxWidth: 500,
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
    }, subtitle:{
        fontSize: '15px', marginBottom:10, align:'center'
    }
});

function ContactForm (props) {
    const [values, setValues] = useState({
                                             name: "", email: "", city: "", message: "", service: "Devenir bénévole",
                                         });
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [cityHelperText, setCityHelperText] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [messageHelperText, setMessageHelperText] = useState(false);

    const [messageSnackBar, setMessageSnackBar] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        validator();
        if (values.name && values.email && values.city && values.message) {
            await fire.db.collection("Contacts").add({...values, date: new Date().toLocaleString()});
            console.log('success');
            setOpen(true);
            setMessageSnackBar("Merci " + values.name + "! Votre message à bien été envoyé. Un email vous à également été envoyé à l'adresse suivante: \"" + values.email + "\". À très Bientôt");
            return;
        }

        console.log('error');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validator = () => {
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
    };

    const {classes} = props;

    return (<Container className={classes.root} component="section" name="ContactForm">
        <Grid container>
            <Grid item xs={12} md={12} className={classes.cardWrapper}>
                <div className={classes.card}>
                    <form onSubmit={handleSubmit} className={classes.cardContent}>
                        <Typography className={classes.title} variant="h4" marked="center" align="center" component="h2">
                            Contactez-nous
                        </Typography>
                        <Typography variant="h5" className={classes.subtitle}>
                            Rentrez vos coordonnées, nous prendrons contact avec vous rapidement
                        </Typography>
                        <TextField error={nameError} helperText={nameHelperText} onChange={handleChange('name')} noBorder className={classes.textField} placeholder="Votre nom" value={values.name}/>
                        <TextField error={emailError} helperText={cityHelperText} onChange={handleChange('email')} noBorder className={classes.textField} placeholder="Votre email" value={values.email}/>
                        <TextField error={cityError} helperText={emailHelperText} onChange={handleChange('city')} noBorder className={classes.textField} placeholder="Votre Ville*" value={values.city}/>
                        <Typography className={classes.zone}>
                            (*) notre zone d'intervention actuelle : <span style={{fontWeight: 'bold',}}>Clamart</span>, <span style={{fontWeight: 'bold'}}>Saint-Cyr-l'Ecole</span> et leur alentour
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
                                value="Dons alimentaires"
                                control={<Radio color="primary"/>}
                                label="Dons alimentaires"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="Aide au devoir"
                                control={<Radio color="primary"/>}
                                label="Aide au devoir"
                                labelPlacement="right"
                            />
                        </RadioGroup>
                        <TextField error={messageError} helperText={messageHelperText} onChange={handleChange('message')} noBorder className={classes.textFieldMessage} multiline rows={4} placeholder="Votre message" value={values.message}/>
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
