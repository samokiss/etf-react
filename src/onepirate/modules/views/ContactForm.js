import React, { useState } from 'react';
import { fire } from '../../../firebase';

const SERVICE_OPTIONS = [
  { value: 'Devenir bénévole', label: 'Devenir bénévole' },
  { value: 'Faire les courses', label: 'Faire les courses' },
  { value: 'Aide au devoirs', label: 'Aide aux devoirs' },
  { value: 'Dons alimentaires', label: 'Faire un don alimentaire' },
  { value: 'Demande alimentaire', label: 'Je récolte des aliments' },
];

function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    city: '',
    message: '',
    service: 'Devenir bénévole',
    cgu: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [sending, setSending] = useState(false);

  const set = (prop) => (e) => {
    const v = prop === 'cgu' ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [prop]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!values.name) errs.name = 'Veuillez rentrer un nom valide';
    if (!values.email) errs.email = 'Veuillez rentrer une adresse mail valide';
    if (!values.city) errs.city = 'Veuillez rentrer une ville valide';
    if (!values.message) errs.message = 'Veuillez rentrer un message valide';
    if (!values.cgu) errs.cgu = 'Veuillez accepter les conditions générales d\'utilisation';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      await fire.db.collection('Contacts').add({ ...values, date: new Date().toLocaleString() });
      setSuccess(`Merci ${values.name} ! Votre message a bien été envoyé. À très bientôt !`);
      setValues({
        name: '', email: '', city: '', message: '',
        service: 'Devenir bénévole', cgu: false,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="cta-final" id="contact">
      <div className="container">
        <h2 className="cta-final__title">Passez à l'action.</h2>
        <p className="cta-final__sub">
          Rentrez vos coordonnées, nous prendrons contact avec vous rapidement.
        </p>
        <form className="contact" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <input
              type="text"
              placeholder="Votre nom"
              className={errors.name ? 'field-error' : ''}
              value={values.name}
              onChange={set('name')}
            />
            {errors.name && <span className="helper">{errors.name}</span>}
          </label>
          <label className="field">
            <input
              type="email"
              placeholder="Votre email"
              className={errors.email ? 'field-error' : ''}
              value={values.email}
              onChange={set('email')}
            />
            {errors.email && <span className="helper">{errors.email}</span>}
          </label>
          <label className="field">
            <input
              type="text"
              placeholder="Votre ville*"
              className={errors.city ? 'field-error' : ''}
              value={values.city}
              onChange={set('city')}
            />
            {errors.city && <span className="helper">{errors.city}</span>}
          </label>
          <p className="zone">
            (*) notre zone d'intervention actuelle : <strong>Clamart</strong>,{' '}
            <strong>Saint-Cyr-l'École</strong> et leurs alentours.
          </p>
          <div className="radios">
            {SERVICE_OPTIONS.map((o) => (
              <label key={o.value}>
                <input
                  type="radio"
                  name="service"
                  value={o.value}
                  checked={values.service === o.value}
                  onChange={set('service')}
                />
                {o.label}
              </label>
            ))}
          </div>
          <label className="field">
            <textarea
              placeholder="Votre message"
              className={errors.message ? 'field-error' : ''}
              value={values.message}
              onChange={set('message')}
            />
            {errors.message && <span className="helper">{errors.message}</span>}
          </label>
          <div className="cgu-row">
            <input
              id="cgu"
              type="checkbox"
              checked={values.cgu}
              onChange={set('cgu')}
            />
            <label htmlFor="cgu">
              En cochant cette case, je reconnais avoir pris connaissance des{' '}
              <a href="/CGU.pdf">Conditions Générales d'Utilisation</a> du site
              ainsi que sa Politique de Confidentialité et je les accepte.
              {errors.cgu && <span className="helper">{errors.cgu}</span>}
            </label>
          </div>
          <button type="submit" className="btn btn--primary" disabled={sending}>
            {sending ? 'Envoi…' : 'Je prends contact'}
          </button>
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
