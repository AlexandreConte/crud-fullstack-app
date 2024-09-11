'use client'
import Produto from "@/types/Produto"

export interface FormProdutoProps {
  produto: Produto
  obterProdutos: () => Promise<void>
  alterarProduto: () => Promise<void>
  setProduto: (produto: Produto | {}) => void
}

export default function FormProduto(props: FormProdutoProps) {
  const {
    produto,
    obterProdutos,
    alterarProduto,
    setProduto
  } = props

  async function criarProduto() {
    await fetch('http://localhost:3001/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })

    setProduto({})
    await obterProdutos()
  }

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="flex flex-col max-w-[1440px] w-full m-2">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={produto.nome ?? ''}
          onChange={e => setProduto({ ...produto, nome: e.target.value })}
          className="bg-zinc-700 p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col max-w-[1440px] w-full m-2">
        <label htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          type="text"
          value={produto.descricao ?? ''}
          onChange={e => setProduto({ ...produto, descricao: e.target.value })}
          className="bg-zinc-700 p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col max-w-[1440px] w-full m-2">
        <label htmlFor="preco">Preço</label>
        <input
          id="preco"
          type="number"
          value={produto.preco ?? ''}
          onChange={e => setProduto({ ...produto, preco: +e.target.value })}
          className="bg-zinc-700 p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col max-w-[1440px] w-full m-8">
        {produto.id ? (
          <button onClick={alterarProduto}
            className="bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-md">
            Salvar alteração do produto
          </button>
        ) : (
          <button onClick={criarProduto}
            className="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-md">
            Criar produto
          </button>
        )}
      </div>
    </div>
  )
}
