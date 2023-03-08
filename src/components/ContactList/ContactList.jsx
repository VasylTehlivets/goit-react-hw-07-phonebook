import css from "../ContactList/ContactList.module.css";
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/filterSlice';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';
import { useMemo } from 'react';

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isFetching } = useGetContactsQuery({ enabled: Boolean(filter) });
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const filteredContacts = useMemo(() => {
    if (!contacts) {
      return [];
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {filteredContacts.length > 0 && (
        <ul className={css.list}>
          {filteredContacts.map(({ id, name, phone }) => {
            return (
              <li key={id} className={css.item}>
                <div>
                  <p className={css.name}>{name}:</p>
                  <p className={css.number}>{phone}</p>
                </div>
                <button
                  className={css.btn}
                  type="button"
                  onClick={() => {
                    deleteContact(id);
                  }}
                >
                  {isLoading ? '...' : 'Delete'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};