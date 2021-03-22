import React from 'react'
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css'


function Filter({ filter, onChangeFilter }) {
  return (
    <label className={s.label}>
      Find contacts by name
      <input  className={s.input}
        type="text"
        value={filter}
        onChange={onChangeFilter}
      />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;