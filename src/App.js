import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

import api from "./services/Api";

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Sorry! Enter the zip code");
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Sorry, error when fetching");
      setInput("");
    }
  }

  return (
    <div className="App">
      <div id="container">
        <h1 className="title">Adress Finder</h1>
        <div className="container-input">
          <input type="text" placeholder="Enter the CEP..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="button-search" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>ST: {cep.logradouro}</span>
            <span>Complement: {cep.complemento}</span>
            <span>Neighborhood: {cep.bairro}</span>
            <span>Location: {cep.localidade}</span>
            <span>State: {cep.uf}</span>
            <span>Population according to IBGE: {cep.ibge}</span>
            <span>Number in the guide: {cep.guia}</span>
            <span>Local area code: {cep.ddd}</span>
            <span>SIAFI number: {cep.siafi}</span>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
