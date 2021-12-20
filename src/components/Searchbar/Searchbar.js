import css from './Searchbar.module.css'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Searchbar = props => {
    const [query, setQuery] = useState('');

   const handleChange = e => {
       setQuery(e.target.value)
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        props.onSubmit(query);
        reset()
    }

    const reset = () => {
        setQuery('');
    }


        return (
            // <form onSubmit={handleSubmit}>
            //     <input onChange={handleChange} name="query" value={query} type="text" placeholder="Product name" required />
            //     <button type="submit">Поиск</button>
            // </form>

            <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit}>
              <button type="submit" className={css.button}>
                <span className={css.button_label}>Search</span>
              </button>
          
              <input
              onChange={handleChange}
                className={css.input}
                type="text"
                name='query'
                value={query}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                required
              />
            </form>
          </header>
        )
    }


Searchbar.protoType = {
    query: PropTypes.string,
  };

export default memo(Searchbar) ;