import { useState } from 'react';
import css from '../ContactForm/ContactForm.module.css';
import { useGetContactsQuery, useAddContactMutation } from '../../redux/contactsSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleChange = event => {
  const { name, value } = event.target;
  const formValue = { name: value };
  formValue[name] = value;
  const setters = {
    name: setName,
    number: setNumber,
  };
  setters[name](value);
};

  const handleSubmit = async event => {
    event.preventDefault();
    const contact = {
      name,
      phone,
    };

    const isContactExist = contacts.some(
      contact =>
        (contact.name === name.toLowerCase() && contact.phone === phone) ||
        contact.phone === phone
    );

    if (isContactExist) {
      alert(`${name} or ${phone} is already in contacts`);
    } else {
      await addContact(contact);
    }

    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.btn} type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add contact'}
      </button>
    </form>
  );
};