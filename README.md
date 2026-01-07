# 🍣 UPSUSHI - Site Moderno para Restaurante Japonês

## Créditos

### Autores

* Gabriel: [@devgabrielpanta](https://www.github.com/devgabrielpanta)
* Antonio: [@antoniocfigueira](https://www.github.com/antoniocfigueira)

### Fonte de Dados
* **Produtos** (título, descrição, preço e imagens): [UberEats](https://www.ubereats.com/pt/store/umami-sushi/RLVHhNzrUHaGMkNMwm0BaQ)
* **Ícones navbar**: Google Gemini & [Sushi - 3d PNG Photos & illustrations, by Hasnain Rasheed](https://www.figma.com/community/file/1415263408290507795/sushi-3d-png-photos-illustrations)
* **Fotos**:
    * **Home (mobile)**: [Foto de Valeria Boltneva no Pexels](https://www.pexels.com/pt-br/foto/arranjo-elegante-de-sushi-e-sashimi-japones-28701162/)
    * **Home (desktop)**: [Foto de Jonathan Borba no Pexels](https://www.pexels.com/pt-br/foto/prato-de-sushi-variado-com-ingredientes-frescos-28559534/ )
    * **Sobre nós (mobile):** [Foto de Yulius Santoso no Pexels](https://www.pexels.com/pt-br/foto/autentica-cena-de-rua-japonesa-a-noite-em-toquio-30992156/)
    * **Sobre nós (desktop):** Google Gemini.


## 📋 Sobre o Projeto

No âmbito do Módulo 02 - Fundamentos de Programação WEB do programa UPSKILL, o objetivo deste projeto foi desenvolver um site moderno para um restaurante japonês, priorizando a experiência do utilizador (UX) e a qualidade do código.

O site, que é um projeto acadêmicos sem fins comerciais, carrega produtos dinamicamente a partir de um ficheiro JSON e gere a navegação com JS sem recarregar a página.

## 🛠️ Tecnologias Utilizadas

* **HTML5** (Semântico)
* **CSS3** (Tailwind CSS v4 + DaisyUI v5 via CDN)
* **JavaScript** (ES6 Modules + Import Attributes)
* **JSON** (Armazenamento de dados da ementa)

## ✅ Cumprimento dos Requisitos do Projeto

### 1. Estrutura (HTML5)
* **Código Semântico:** Utilização correta de tags como `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` e `<dialog>` em vez de apenas `divs`.
* **Formulários Robustos:** O formulário de reservas utiliza tipos de input específicos (`datetime-local`, `email`, `number`) e atributos de validação nativa (`required`). Ademais, foi utilizado JS para processar o formulário (sem submissão dos dados) e manipular o DOM com uma mensagem de sucesso, bem como ocultando e resetando os campos.

### 2. Layout (CSS Responsivo)
* **Mobile First:** A estrutura base foi desenhada para dispositivos móveis, adaptando-se a ecrãs maiores através de breakpoints do Tailwind (`md:`, `lg:`).
* **Flexbox e Grid:** Utilização extensiva de `flex` para alinhamentos e `grid` para a grelha de produtos responsiva (`grid-cols-[repeat(auto-fit...)]`).

### 3. Interatividade (JavaScript)
* **SPA Feeling:** Implementação de um `handleRouteChange` que atualiza o DOM dinamicamente com base na navegação, sem recarregar a página.
* **Manipulação do DOM:** Geração automática da lista de categorias e dos cartões de produtos a partir de dados JSON.
* **Eventos:** Listeners para cliques, gestão de modais (abrir/fechar) e submissão de formulários com feedback visual.

### 4. Acessibilidade (WCAG)
* **Imagens:** Todas as imagens geradas via JS possuem atributos `alt` descritivos (baseados no nome do produto).
* **Contraste:** Utilização do design system do DaisyUI para garantir uma interface e experiência do utilizador.
* **Formulários:** Labels corretamente associadas aos inputs.

### 5. Organização
* **Código Limpo:** Ficheiros devidamente indentados e comentados.
* **Separação de Responsabilidades:**
    * `index.html`: Estrutura da página.
    * `scripts/main.js`: Manipulação do DOM e tratamento dos dados.
    * `products.json`: Fonte de dados.

## ✨ Funcionalidades

* **Navegação Dinâmica:** Alternância rápida entre "Home", "Sobre Nós" e categorias do menu (Entradas, Sashimis, etc.).
* **Visualização de Produtos:** Grelha responsiva de produtos com detalhes.
* **Modais Interativos:**
    * **Detalhes do Produto:** Pop-up com foto, descrição completa e preço.
    * **Reservas:** Formulário overlay acessível de qualquer ponto do site.
* **Feedback ao Utilizador:** Mensagem de sucesso após efetuar uma reserva fictícia.
* **Conformidade GDPR:** Checkbox de consentimento obrigatória no formulário.

## 📂 Estrutura de Arquivos

```text
/
├── assets/
│   ├── images/          # Imagens do layout e produtos
│   └── favicon.svg
├── scripts/
│   └── main.js          # Lógica principal (Router, Renderização, Eventos)
├── products.json        # Base de dados dos produtos (Importado no JS)
├── index.html           # Ficheiro principal
└── README.md            # Documentação do projeto
```
## 🚀 Como Executar o Projeto
⚠️ Atenção: Este projeto utiliza ES Modules e a sintaxe moderna de Import Attributes para JSON (import ... with { type: "json" }). Devido às políticas de segurança dos navegadores (CORS), não é possível abrir o ficheiro index.html diretamente (file://) - é necessário utilizar um servidor local:

* Instale a extensão Live Server no VS Code.
* Abra o ficheiro index.html.
* Clique em "Go Live" no canto inferior direito.