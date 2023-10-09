import logo from './logo.svg';
import './App.css';
import ItemsFilter from './ItemsFilter';
import ItemsList from './ItemsList';
import AddItem from './AddItem';

import { useState } from 'react';
import { useEffect } from 'react';


function App() {

  const [state, setState] = useState({
    items: [],
    filter: '',
    newName: '',
    newEmail: ''
  });

  useEffect(() => {
    // Define an async function to fetch data
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update the state with the fetched data
        setState({
          ...state,
          items: data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  function filterItems(e) {
    setState({
      ...state,
      filter: e.target.value
    });
  }

  function addItem(e) {
    e.preventDefault();

    let newItem = {
      id: (state.items[state.items.length - 1].id + 1),
      name: e.target.newName.value,
      email: e.target.newEmail.value
    };

    let items = state.items.slice(); // shallow copy of array
    items.push(newItem);

    setState({
      items: items
    });
  }

  let items = state.items;

  if (state.filter){
      items = items.filter(item => item.name.toLowerCase().includes( state.filter.toLowerCase() ));
  }

  return (
    <div className="App">
      <div>
        <ItemsFilter label="Filter names" onChange={filterItems} />
        <ItemsList items={items} />
        <AddItem onSubmit={addItem} />
      </div>
    </div>
  );
}

export default App;
