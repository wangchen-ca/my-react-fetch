import React from 'react';

// ItemsFilter component
export default function ItemsFilter(props) {
    return (
        <div>
            <label htmlFor="item-filter">{props.label}</label>
            <input type="text" id="item-filter" placeholder="Filter items" onChange={props.onChange} />
        </div>
    );
};