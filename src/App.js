import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import UserButton from "./components/UserButton";
import ProgressBar from "./components/ProgressBar";
import DepositosTabela from "./components/DepositosTabela";
import "./styles/global.css";
import "./styles/DepositosTabela.css";

function App() {
  const total = 200;
  const [status, setStatus] = useState(Array(total).fill("none"));
  const [usuarioAtivo, setUsuarioAtivo] = useState("Rafael");

  // 🔹 Carregar status do backend ao iniciar
  useEffect(() => {
    fetch("/api/depositos")
      .then(res => res.json())
      .then(data => {
        if (data.status && data.status.length === total) {
          setStatus(data.status);
        } else {
          // inicializa no backend se estiver vazio
          salvarDepositos(Array(total).fill("none"));
        }
      })
      .catch(err => console.error("Erro ao carregar depósitos:", err));
  }, []);

  // 🔹 Salvar status no backend
  const salvarDepositos = async (novoStatus) => {
    try {
      await fetch("/api/depositos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus })
      });
      setStatus(novoStatus);
    } catch (err) {
      console.error("Erro ao salvar depósitos:", err);
    }
  };

  // 🔹 Função para marcar depósitos
  const marcarDeposito = (index) => {
    const novoEstado = [...status];
    if (usuarioAtivo === "Rafael") {
      novoEstado[index] = novoEstado[index] === "green" ? "none" : "green";
    } else {
      novoEstado[index] = novoEstado[index] === "red" ? "none" : "red";
    }
    salvarDepositos(novoEstado);
  };

  // 🔹 Cálculos
  const somaRafael = status.reduce(
    (acc, s, i) => (s === "green" ? acc + (i + 1) : acc),
    0
  );
  const somaTayara = status.reduce(
    (acc, s, i) => (s === "red" ? acc + (i + 1) : acc),
    0
  );
  const somaTotal = somaRafael + somaTayara;
  const somaMaxima = (total * (total + 1)) / 2;
  const percentual = (somaTotal / somaMaxima) * 100;

  return (
    <div className="app-container">
      {/* Cabeçalho */}
      <Header />

      {/* Botões de usuário */}
      <div className="user-buttons">
        <UserButton
          label="Rafael ✅"
          active={usuarioAtivo === "Rafael"}
          color="#4caf50"
          onClick={() => setUsuarioAtivo("Rafael")}
        />
        <UserButton
          label="Tayara 🔴"
          active={usuarioAtivo === "Tayara"}
          color="#f44336"
          onClick={() => setUsuarioAtivo("Tayara")}
        />
      </div>

      {/* Contadores */}
      <p>Rafael soma: <strong>{somaRafael}</strong></p>
      <p>Tayara soma: <strong>{somaTayara}</strong></p>
      <p className="soma-total">
        Soma conjunta: <strong>{somaTotal}</strong> 💰
      </p>

      {/* Barra de progresso */}
      <ProgressBar percentual={percentual} />

      {/* Tabela */}
      <DepositosTabela
        total={total}
        status={status}
        marcarDeposito={marcarDeposito}
      />
    </div>
  );
}

export default App;