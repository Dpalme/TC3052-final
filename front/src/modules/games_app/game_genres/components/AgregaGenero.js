/*
Sebastian Morales A01376228
Diego Palmerin A01747290
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AgregaGenero = ({ setGeneros }) => {
    const [inputValue, setInputValue] = useState('');

    const updateInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim().length > 4) {
            setGeneros(inputValue);
            setInputValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group input-group-sm mb-3">
                <input
                    type="text"
                    onInput={updateInputValue}
                    placeholder='Nombre del género'
                    className="form-control"
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Add" />
        </form>
    )
}

AgregaGenero.propTypes = {
    setGeneros: PropTypes.func.isRequired
}