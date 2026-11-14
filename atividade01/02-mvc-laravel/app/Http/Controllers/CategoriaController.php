<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Produto;

// CONTROLLER das categorias (mesmo padrão do ProdutoController).
class CategoriaController extends Controller
{
    // Listagem: GET /categorias
    public function index()
    {
        $categorias = Categoria::orderBy('id')->get();

        return view('categorias.index', [
            'categorias' => $categorias,
        ]);
    }

    // Detalhe: GET /categorias/{id}
    public function show(int $id)
    {
        // findOrFail devolve 404 automaticamente se a categoria não existir.
        $categoria = Categoria::findOrFail($id);

        // Os produtos se ligam à categoria pelo NOME (coluna `categoria`).
        $produtos = Produto::where('categoria', $categoria->nome)->get();

        return view('categorias.show', [
            'categoria' => $categoria,
            'produtos' => $produtos,
        ]);
    }
}