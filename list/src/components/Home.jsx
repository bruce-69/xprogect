import "./Home.css";
import { useEffect, useState } from "react";

function Home() {
  const [tarefalista, settarefalista] = useState([]);

  const [novatarefa, setnovatarefa] = useState({
    text: "",
  });



   const baseurl = "http://localhost:8000/tarefa";

  async function logterefa() {
    const response = await fetch(baseurl);
    const tarefa = await response.json();
    console.log(tarefa);
    settarefalista(tarefa);
  }

  useEffect(() => {
    logterefa();
  }, []);
/* 
  STATE CRIAR
  const [ criattarefa, setreattarefa ] = useState({
    "id" : "",
      
    "text": ""
})

 */


  const adicinar = (event) => {
    setnovatarefa({ ...novatarefa, [event.target.name]: event.target.value });
    console.log(novatarefa);
  };


  /* const [tarefa, setlist] = useState({
    text: "",
  });


 */

  return (
    <div>
      <input
        placeholder="nova tarefa"
        name="adicionar"
        id="tarefa_new"
        onChange={adicinar}
        type="text"
      />
      

      
{/* botao adicionar tarefa*/}     
  <button /* onClick={creat_tarefa} */>adicionar</button>
  {/*botao aptagar */}
  <button>apagar</button>


  
      {tarefalista.map((tarefas, index) => (
        <div key={index}>
          <span>{tarefas.text}</span>

{/*           
 */}        </div>
      ))}
    </div>
  );
}

export default Home;
