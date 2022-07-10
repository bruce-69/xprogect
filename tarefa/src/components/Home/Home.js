import React, { useState, useEffect } from 'react'
import "./PaletaLista.css"
import PaletaForm from "../Forms/PaletaForm"
import ReadById from '../ReadById/ReadById'

function PaletaLista() {

    const [paletaList, setPaletaList] = useState([])
    const [paleta, setPaleta] = useState({
        paleta_id: ""
    })
    const [novaPaleta, setNovaPaleta] = useState({
        descricao: "",
        foto: "",
        preco: "",
        sabor: "",
        em_estoque: false,
    })

    const baseURL = 'http://localhost:8000/paletas';

    const [showPaletaForm, setShowPaletaForm] = useState(false)

    async function findOnePaleta(id) {
        const response = await fetch(`${baseURL}/${id}`)
        const paleta = await response.json()
        console.log("RETORNO API paleta", paleta)
        setPaletaList([paleta])
    }

    async function create(paleta) {
        const response = await fetch(baseURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(paleta),
        })
        const novaPaleta = await response.json()
        console.log("RETORNO DA CREATE PALETA", novaPaleta)
        setPaletaList([novaPaleta])
    }

    async function findAllPaletas() {
        const response = await fetch(baseURL)
        const paletas = await response.json()
        setPaletaList(paletas)
    }

    // useEffect(()=> {
    //     findAllPaletas()
    // }, []) // array de dependência vazia, significa que o useEffect sera invocado uma unica vez, 
    // //na montagem do componente. 


    useEffect(() => {
        findAllPaletas()
    }, [novaPaleta]) // te uma variável na nossa array de dependências => quer dizer 
    // que o useEffect sera invocado na montagem do componente e toda vez que essa variável for atualizada.

    const handleChange = (event) => {
        // setPaleta({...paleta, paleta_id: event.target.value})
        setPaleta({ ...paleta, [event.target.name]: event.target.value })
    }

    const handleChangeCreate = (event) => {
        console.log("handle change create")
        setNovaPaleta({ ...novaPaleta, [event.target.name]: event.target.value })
    }

    const handleClick = (event) => {
        const paleta_id_search = paleta.paleta_id
        findOnePaleta(paleta_id_search)
    }

    const handleCreatePaleta = () => {
        console.log("Create")
        const paleta_a_ser_criada = { ...novaPaleta }
        create(paleta_a_ser_criada)
        setShowPaletaForm(false)
        setNovaPaleta({
            descricao: "",
            foto: "",
            preco: "",
            sabor: ""
        })
    }

    console.log(novaPaleta)

    const handleShowPaletaForm = () => {
        setShowPaletaForm(true)
    }

    return (
        <div className="PaletaLista">
            {/* PESQUISAR UMA PALETA */}
         
            <div>
   
                <div className="mb-3">
                    <label htmlFor='buscarUmaPaleta' className="form-label">
                        "Pesquise uma paleta"
                    </label>
                    <input
                        id="buscarUmaPaleta"
                        label="Pesquise uma paleta"
                        type="text"
                        name="paleta_id"
                        onChange={handleChange}
                        value={paleta.paleta_id}

                    />
                </div>
                <button type="button"
                    className={`btn btn-primary`}
                    onClick={handleClick}>
                    Pesquisar
                </button>
            </div>

            {/* CADASTRAR UMA PALETA */}
            <button type="button"
                className={`btn btn-danger`}
                onClick={handleShowPaletaForm}>
                Cadastrar Nova Paleta
            </button>
            {/* RENDERIZAÇÃO CONDICIONAL TERNÁRIO */}
            {showPaletaForm ?

                <PaletaForm
                    onChange={handleChangeCreate}
                    descricao_value={novaPaleta.descricao}
                    foto_value={novaPaleta.foto}
                    preco_value={novaPaleta.preco}
                    sabor_value={novaPaleta.sabor}
                    onClick={handleCreatePaleta}
                    button_label={"Submit"}
                />

                : null}
                <div   className="mb-3">
         <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
             /* RENDERIZAÇÃO CONDICIONAL COM SHORT-CIRCUIT */
             /* {showPaletaForm &&   
                        <PaletaForm 
                            onChange={handleChangeCreate}
                            descricao_value={novaPaleta.descricao}
                            foto_value={novaPaleta.foto}
                            preco_value={novaPaleta.preco}
                            sabor_value={novaPaleta.sabor}
                            onClick={handleCreatePaleta}
                            button_label={"Submit"}
                            />} */

             /* RENDERIZAÇÃO DE LISTA */
             {paletaList.map((paleta, index) => (
                <div key={index} className="card" style={{ width: "18rem", backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                    <img img src={paleta.foto} className="card-img-top PaletaListaItem__foto" alt={`Foto paleta ${paleta.sabor}`} />
                    <div className="card-body">
                        <h5 className="card-title">{paleta.sabor}</h5>
                        <p className="card-text">{paleta.descricao}</p>
                        <span className="card-text">{paleta.preco}</span>
                    </div>
                </div>
 </div>
              ))}
       
    )
}

export default PaletaLista