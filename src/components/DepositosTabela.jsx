import React from "react";
import "../styles/DepositosTabela.css";

function DepositosTabela({ total, status, marcarDeposito }) {
  const colunas = 10;
  const linhas = total / colunas;

  const getCellStyle = (state) => {
    if (state === "green") {
      return { backgroundColor: "#4caf50", color: "white", borderRadius: "6px" };
    } else if (state === "red") {
      return { backgroundColor: "#f44336", color: "white", borderRadius: "6px" };
    } else {
      return { backgroundColor: "#f0f0f0", color: "black", borderRadius: "6px" };
    }
  };

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
      <table className="depositos-tabela">
        <tbody>
          {Array.from({ length: linhas }).map((_, linhaIndex) => (
            <tr key={linhaIndex}>
              {Array.from({ length: colunas }).map((_, colIndex) => {
                const index = linhaIndex * colunas + colIndex;
                return (
                  <td
                    key={colIndex}
                    onClick={() => marcarDeposito(index)}
                    style={{
                      ...getCellStyle(status[index]),
                    }}
                  >
                    {index + 1}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepositosTabela;