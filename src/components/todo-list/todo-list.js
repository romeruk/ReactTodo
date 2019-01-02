import React from 'react';
import TodoListItem from '../todo-list-item';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {

	const items = todos.map(item => {
		const {index, ...itemprops} = item;
		return (
			<li key={index} className="list-group-item">
				<TodoListItem {...itemprops} 
				onDeleted={() => onDeleted(index)} 
				onToggleImportant={() => onToggleImportant(index)}
                onToggleDone={() => onToggleDone(index)}
				/>
			</li>
		);
	});
    return (
    <ul className="list-group todo-list">
		{items}
	</ul>
    );
};

export default TodoList;