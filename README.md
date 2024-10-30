
<div align="center">
  <br />
      <img src="./assets/gitimages/logo.png" alt="Tela inicial do Soundify" width="600">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="reactnative" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=gray" alt="clerk" />
    <img src="https://img.shields.io/badge/-Redux-black?style=for-the-badge&logoColor=white&logo=redux&color=764ABC" alt="redux" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwind-css&color=38B2AC" alt="tailwind" />
  </div>

  <p align="center">
    Um aplicativo de streaming de música feito com <strong>React Native</strong> e <strong>Expo</strong> que traz a experiência imersiva de ouvir suas músicas favoritas, explorar playlists e descobrir novos artistas.
  </p>
</div>

**[English](#en) | [Português](#pt)**

<a name="pt"><h1>🇧🇷 Português</h1></a>

## 📋 Tabela de Conteúdos

1. [Introdução](#introducao)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Capturas de Tela](#capturas-de-tela)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Instalação e Configuração](#instalacao-e-configuracao)
6. [Arquitetura do Projeto](#arquitetura-do-projeto)
7. [Contribuições](#contribuicoes)
8. [Licença](#licenca)

## 🚀 <a name="introducao">Introdução</a>

Soundify é um aplicativo de streaming de música desenvolvido com **React Native** e **Expo** que proporciona uma experiência rica para ouvir músicas, explorar playlists e descobrir novos artistas. Utilizando tecnologias modernas, como **Clerk** para autenticação e **Redux** para gerenciamento de estado, o Soundify oferece uma interface de usuário intuitiva com funcionalidades completas de player, favoritos e personalização de playlists.

## 🎯 <a name="funcionalidades-principais">Funcionalidades Principais</a>

- **Criação e Login de Contas**: Registre-se e faça login de maneira segura para acessar todos os recursos do aplicativo.
- **Player Completo**: Controle total de reprodução com funcionalidades de play/pause, repeat e controle de volume.
- **Tocar Músicas**: Interface de player com todas as funcionalidades completas.
- **Favoritar Músicas**: Adicione músicas aos favoritos e crie uma playlist personalizada com todas as suas músicas preferidas.
- **Criação, Edição e Exclusão de Playlists**: Personalize sua experiência com playlists exclusivas.
- **Navegação entre Artistas**: Explore músicas por artistas e acesse facilmente suas playlists e faixas.
- **Floating Player Estilo Spotify**: Mantenha o controle do que está tocando com um player flutuante sempre visível.
- **Barra de Progresso de Música**: Barra interativa que permite acompanhar o progresso, avançar ou retroceder a música.
- **Edição de Perfil**: Personalize sua conta com a opção de escolher e atualizar a foto de perfil.

## 📸 <a name="capturas-de-tela">Capturas de Tela</a>

> Adicione aqui algumas capturas de tela para ilustrar a interface.

## 🚀 <a name="tecnologias-utilizadas">Tecnologias Utilizadas</a>

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática para um desenvolvimento mais seguro e eficiente.
- **React Native**: Construção de interfaces mobile.
- **Expo**: Desenvolvimento e deployment simplificado.
- **Expo Router**: Facilita a navegação entre telas de forma declarativa e organizada, inspirada pelo sistema de roteamento de páginas web.
- **React Native Track Player**: Implementação de funcionalidades avançadas de player.
- **Clerk**: Gerenciamento de autenticação e usuários, garantindo segurança e facilidade de uso.
- **Redux**: Gerenciamento centralizado do estado para playlists, músicas favoritas e preferências do usuário.
- **Tailwind (Nativewind)**: Estilização com classes utilitárias usando Tailwind via Nativewind, tornando a interface responsiva e estilizada.

## 🛠 <a name="instalacao-e-configuracao">Instalação e Configuração</a>

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/soundify.git
cd soundify
```

2. Instale as dependências:
```bash
npm install
```

3. **Baixar as Builds Especiais**

   Este projeto utiliza código nativo, então é necessário utilizar uma build especial para cada plataforma:

   - **Android**: [Link para download da build de Android](https://expo.dev/accounts/darkincorporation/projects/soundify/builds/90f2a93c-1306-4566-8ffa-74b9a9e96664)
   - **iOS**: [Link para download da build de iOS](https://expo.dev/accounts/darkincorporation/projects/soundify/builds/58cf1c5a-ee28-4360-b7dd-a7696cfb91a6)

4. **Configurar Clerk para Autenticação**

   Para o funcionamento correto da autenticação, é necessário configurar uma API Key do Clerk:

   - Crie um projeto no Clerk em [clerk.com](https://clerk.com).
   - Copie a Publishable Key do projeto.
   - Crie um arquivo `.env` na raiz do projeto e adicione a chave:

  ```bash
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="sua-chave-clerk-aqui"
  ```

5. **Iniciar o Servidor Expo**

   Inicie o servidor Expo para que o app possa se conectar ao backend:

   ```bash
   npx expo start
   ```

6. **Executar no Simulador**

   Com a build baixada e instalada, execute o aplicativo no simulador de sua preferência. Acesse o endereço localhost gerado pelo Expo CLI no simulador para que ele se conecte ao servidor.

## 📂 <a name="arquitetura-do-projeto">Arquitetura do Projeto</a>

- **src/**: Contém o código-fonte do aplicativo.
- **components/**: Componentes reutilizáveis, como botões de controle e visualização de letras.
- **store/**: Configuração do Redux para gerenciamento de estado.
- **constants/**: Armazena cores, imagens e outras constantes.
- **hooks/**: Hooks personalizados, incluindo integração com o player e temas.
- **types/**: Definições de tipos TypeScript para uso em todo o projeto.

## 🤝 <a name="contribuicoes">Contribuições</a>

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📄 <a name="licenca">Licença</a>

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido por Lucas Matias.

Conecte-se comigo no LinkedIn para explorar mais sobre meus projetos!
