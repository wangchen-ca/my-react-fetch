import React from 'react';

// ItemsList component
export default function ItemsList(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Name</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                { props.items.map(item => <ItemRow key={item.id} item={item} />) }
            </tbody>
        </table>
    );
};

export function ItemRow(props) {
    let item = props.item;
  return (
    <tr><td>{item.id}</td><td>{item.name}</td><td>{item.email}</td></tr>
  );  
}; 