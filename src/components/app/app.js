import React, {Component} from 'react';

import AppHeader from '../app-header';
import AppSearch from '../app-search';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App  extends Component {
    state = {
        todoItems: [
            { "index": 1, "label": "Go grocery shopping", done: false, important: false },
            { "index": 2, "label": "Wash the car", done: false, important: false },
            { "index": 3, "label": "Pay all the bills", done: false, important: false },
            { "index": 4, "label": "Finish React ToDo List App", done: false, important: false },
            { "index": 5, "label": "Do the laundry", done: false, important: true }
          ],

          filter: "all",
          search: ""
    }

    deleteItem = (index) => {
        this.setState(({todoItems}) =>{
            const deepCopyObject = [...JSON.parse(JSON.stringify(todoItems))];

            const updateItems = deepCopyObject.filter(item => item.index !== index);
            return {
                todoItems: updateItems
            }
        });
    }

    onItemAdded = (label) => {
        this.setState(({todoItems}) => {
            const newItem = {
                index: typeof todoItems[todoItems.length - 1] != "undefined" ? todoItems[todoItems.length - 1].index + 1 : 0,
                label,
                done: false,
                important: false
            }

            return {
                todoItems: [...todoItems, newItem]
            }

        });
        console.log(this.state.todoItems);
    }

    toggleProperty (todoItems, index, property) {
        const deepCopyObject = [...JSON.parse(JSON.stringify(todoItems))];
        const items = deepCopyObject.map(item => {

            if (item.index === index) {
                item[property] = !item[property]
            }

            return item;
        });

        return items;
    }

    onToggleImportant = (index) => {
        this.setState(({todoItems}) => {
            return {
                todoItems: this.toggleProperty(todoItems, index, "important")
            }
        });
        
    }

    onToggleDone = (index) => {
        this.setState(({todoItems}) => {
            return {
                todoItems: this.toggleProperty(todoItems, index, "done")
            }
        });
    }

    filterItems(items, filter) {
        if (filter === "all") {
          return items;
        } else if (filter === "active") {
          return items.filter((item) => (!item.done));
        } else if (filter === "done") {
          return items.filter((item) => item.done);
        }
      }

      changeFilter = (filter) => {
          this.setState({filter});
      }

      searchFilter = (search) => {
        this.setState({search});
    }

    searchItems(items, search) {
        if (search.length === 0) {
            return items;
          }

        return items.filter((item) => {
          return item.label.toLowerCase().includes(search.toLowerCase());
        });
      }
    
    render () {
        const {todoItems, filter, search} = this.state;

        const doneCount = todoItems.filter((item) => item.done).length;
        const toDoCount = todoItems.length - doneCount;
        const items = this.searchItems(this.filterItems(todoItems, filter), search);

        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount} done={doneCount}  />
                <div className="top-panel d-flex">
                    <AppSearch 
                    searchFilter = {this.searchFilter}
                    />
                    <ItemStatusFilter
                    changeFilter = {this.changeFilter}
                    filter = {filter}
                    />
                </div>
                <TodoList 
                todos={items} 
                onDeleted = {this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                />

                <ItemAddForm
                 onItemAdded={this.onItemAdded}
                 />
            </div>
        );
    }
};
