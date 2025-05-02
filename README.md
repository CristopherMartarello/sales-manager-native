# 🛍️ Sales Manager App

Aplicativo de **gerenciamento de vendas** desenvolvido com **React Native** e **React Native Paper**. O sistema permite adicionar, editar, excluir e organizar vendas de forma prática, com filtros e interface moderna.

## 🚀 Como executar

1. Clone o repositório:
   ```bash
   [git clone https://github.com/seu-usuario/sales-manager-app.git](https://github.com/CristopherMartarello/sales-manager-native.git)
   cd sales-manager-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o app com Expo:
   ```bash
   npx expo start
   ```

---

## 🎯 Funcionalidades

- Adicionar, editar e excluir vendas.
- Definir a **categoria** da venda: Geral, Encomenda, Entrega ou Concluída.
- Filtrar vendas por categoria.
- Marcar vendas como **concluídas**.
- Interface intuitiva e responsiva.

---

## 🧩 Recursos do React Native Paper aplicados

| Recurso                     | Onde foi usado                                                                 |
|----------------------------|--------------------------------------------------------------------------------|
| **Appbar**                 | Barra superior com o título do app e botão para alternar entre tema claro/escuro. |
| **FAB (FloatingActionButton)** | Botão flutuante no canto inferior direito para adicionar nova venda.           |
| **Banner**                 | Mensagem de boas-vindas na parte superior da tela inicial.                     |
| **DataTable**              | Listagem das vendas com colunas: Concluída, Nome, A Vista, Categoria, Preço e Ações.              |
| **Dialog**                 | Confirmação de exclusão ao tentar remover uma venda.                          |
| **ActivityIndicator**      | Foi substituído por uma mensagem que avisa se há ou não vendas cadastradas.       |
| **TextInput com ícone**    | Usado na tela de adicionar/editar vendas para entrada de nome e preço.        |
| **RadioButton.Group**      | Definição da categoria da venda (Geral, Encomenda, Entrega) na tela de adição/edição. |
| **Checkbox**               | Para marcar uma venda como concluída diretamente na tabela.                   |
| **Tooltip**                | Orientações ao usuário ao preencher os campos de venda.                        |
| **Chip**                   | Filtros rápidos por categoria: Geral, Encomenda, Entrega, Concluídas.         |
| **Bottom Navigation Bar**  | Navegação entre “Lista de Vendas” e “Adicionar Venda”.   |

---
## 📁 Estrutura resumida do projeto

```
📦 sales-manager-app
┣ 📂 src/
┃ ┣ 📂 screens/
┃ ┃ ┣ 📄 HomeScreen.js
┃ ┃ ┗ 📄 AddSaleScreen.js
┃ ┣ 📂 contexts/
┃ ┃ ┗ 📄 ThemeContext.js
┃ ┗ 📄 App.js
┣ 📄 README.md
┗ 📄 package.json
```
