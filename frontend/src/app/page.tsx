'use client'
import FormProduto from "@/components/FormProduto";
import Produtos from "@/components/Produtos";
import Produto from "@/types/Produto";
import { useEffect, useState } from "react";

export default function Home() {
  const [produto, setProduto] = useState<any>({});
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    obterProdutos()
  }, [])

  async function obterProdutos() {
    try {
      const resposta = await fetch('http://localhost:3001/produtos')
      const produtos = await resposta.json()
      setProdutos(produtos)
    }
    catch (error: any) {
      console.log(error.message)
    }
  }

  async function alterarProduto() {
    await fetch(`http://localhost:3001/produtos/${produto.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })

    setProduto({})
    await obterProdutos()
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10 py-12">
      <FormProduto
        produto={produto}
        setProduto={setProduto}
        alterarProduto={alterarProduto}
        obterProdutos={obterProdutos}
      />
      <Produtos
        produtos={produtos}
        setProduto={setProduto}
        obterProdutos={obterProdutos}
      />
    </div>
  );
}
