import AddItem from './AddItem';
import './App.css';
import ItemsFilter from './ItemsFilter';
import ItemsList from './ItemsList';

import { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'fetched_items': {
      let items = action.items;
      return { ...state, items: items }
    }
    case 'added_item': {
      let newItem = {
        id: (state.items.length === 0) ? 0 : (state.items[state.items.length - 1].id + 1),
        name: action.newName,
        email: action.newEmail
      };

      let items = state.items.slice(); // shallow copy of array
      items.push(newItem);

      return { ...state, items }
    }
    case 'inputed_filter': {
      return {
        ...state,
        filter: action.filter
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}


function App() {

  const [state, dispatch] = useReducer(reducer, {
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
        console.log("fetched data=" + { data });
        dispatch({ type: "fetched_items", items: data })

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  function filterItems(e) {
    dispatch({ type: "inputed_filter", filter: e.target.value })
  }

  function addItem(e) {
    e.preventDefault();
    dispatch({ type: "added_item", newName: e.target.newName.value, newEmail: e.target.newEmail.value })
  }

  let items = state.items;

  if (state.filter) {
    items = items.filter(item => item.name.toLowerCase().includes(state.filter.toLowerCase()));
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
