const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list-div')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const isChecked = false;

const TodoList = () => {

  const [todoList, setList] = React.useState([]);
  const [itemCount, setItemCount] = React.useState(0);
  const [inCompleteItems, setInCompleteCount] = React.useState(0);

  function getIncompleteCount(inCompleteItems, itr) {
      let childNodes = document.getElementById("todo-list").childNodes;
      let count = itr === 'new' ? 1 : 0;
      if (childNodes) {
          for (const li of childNodes) {
              if (li.children && !li.children[0].checked) {
                  count++;
              }
          }
      }
      inCompleteItems = count;
      return inCompleteItems;
  }

  const newTodo = () => {
      const todoText = document.getElementById("todo-text").value;
      if (todoText) {
          setList([...todoList, todoText]);
          setItemCount(itemCount => itemCount + 1);
          setInCompleteCount(inCompleteItems => {
              return getIncompleteCount(inCompleteItems, "new");
          });
      }
  };

  const checkboxAction = (event) => {
      const checkbox = event.target;
      setInCompleteCount(inCompleteItems => {
          inCompleteItems = checkbox.checked ? inCompleteItems - 1 : inCompleteItems + 1;
          return inCompleteItems;
      });
  };

  const handleDelete = (event) => {
      const button = event.target;
      const label = button.parentElement.parentElement.getElementsByTagName('label')[0];
      const checkbox = button.parentElement.parentElement.getElementsByTagName('input')[0];
      const text = label.textContent;

      setItemCount(itemCount => itemCount - 1);

      setList(todoList => {
          for(const index in todoList) {
              if(text === todoList[index]) {
                  todoList.splice(index, 1);
                  break;
              }
          }
          return todoList;
      });

      setInCompleteCount(inCompleteItems => {
          inCompleteItems =  getIncompleteCount(inCompleteItems);
          return checkbox.checked ? inCompleteItems : inCompleteItems - 1;
      });
  };

  return (
      <div className="container center">
          <h1 className="center title">My TODO App</h1>
          <div className="flow-right controls">
              <span>Item count: <span id="item-count">{itemCount}</span></span>
              <span>Unchecked count: <span id="unchecked-count">{inCompleteItems}</span></span>
          </div>
          <button id="button" className="button center" onClick={newTodo}>New TODO</button>
          <br/>
          <br/>
          <br/>
          <input type="text" id="todo-text"/>
          <br/>
          <br/>
          <ul id="todo-list" className="todo-list">
              {todoList.map((todo, index) =>
                  <li className={classNames.TODO_ITEM} key={index}>
                      <input className={classNames.TODO_CHECKBOX} type="checkbox"
                             onClick={checkboxAction}/>
                      <label className={classNames.TODO_TEXT}>{todo}</label>
                      <button className="btn" onClick={handleDelete}><i className="fa fa-close"></i></button>
                  </li>)}
          </ul>
      </div>
  );
}

ReactDOM.render(<TodoList/>, list);
