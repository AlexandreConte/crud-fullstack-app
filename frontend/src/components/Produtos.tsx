import Produto from "@/types/Produto"

export interface ProdutosProps {
  produtos: Produto[]
  setProduto: (produto: Produto | {}) => void
  obterProdutos: () => Promise<void>
}

export default function Produtos(props: ProdutosProps) {
  const { produtos, setProduto, obterProdutos } = props

  function obterProdutoPorId(id: number) {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then(res => res.json())
      .then(setProduto)
  }

  async function excluirProduto(id: number) {
    await fetch(`http://localhost:3001/produtos/${id}`, {
      method: 'DELETE',
    })

    await obterProdutos()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[1440px]:grid-cols-4 max-w-[1440px]">
      {produtos?.map((produto: any) => (
        <div key={produto.id} className="w-full ">
          <div className="
              flex flex-col gap-4 m-4 bg-zinc-800 p-6 rounded-md
            ">
            <h2 className="font-bold">{produto.nome}</h2>
            <div>{produto.descricao}</div>
            <div className="font-bold">R$ {produto.preco.toFixed(2)}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => obterProdutoPorId(produto.id)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors rounded-md"
              >
                Alterar produto
              </button>
              <button
                onClick={() => excluirProduto(produto.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors rounded-md"
              >
                Excluir produto
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
