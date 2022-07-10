import { list_mock } from "../mock/list";
import { useState } from "react";

function MeuTodoList() {
  const [listas, setListas] = useState([...list_mock]);
  const [itemNovo, setItemNovo] = useState("");

  
  const mostrarALista = (event) => {
    const clone = [...list_mock];
    
    console.log(clone);https:
  setListas(clone);
};
    
  const adicionaNovoItemNaLista = (event) => {
  let new_list = {
      item: itemNovo,
    };
    console.log("new_list: ", new_list);
    const clone2 = [...listas];
    clone2.push(new_list);
    console.log("clone2: ", clone2);
    setListas(clone2);
    setItemNovo("");
  };
  const handleChangeInput = (event) => {

  setItemNovo(event.target.value);
};
  const remove = () => {
    
  }

  return (
    <main className="main">
      <div className="entire-TodoList">
        <div>
          <input
            onChange={handleChangeInput}
            placeholder="nova"
            value={itemNovo}
          />
        <button onClick={adicionaNovoItemNaLista}>nova</button>        <button onClick={mostrarALista}>apagr</button>
        </div>
   
        <h4><br/>tarefa</h4>
        {listas.map((lista, index) => {
          return (
            <div key={`ItemList_${index}`}>
              <div>
                
                  <input type="checkbox"/>{lista.item}
                
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MeuTodoList;



