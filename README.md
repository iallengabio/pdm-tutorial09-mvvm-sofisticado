# PDM Tutorial 09 - MVVM Sofisticado com Clean Architecture

Este projeto é um exemplo pedagógico desenvolvido para a disciplina de Programação para Dispositivos Móveis (PDM). O objetivo é demonstrar a implementação de uma arquitetura **MVVM (Model-View-ViewModel)** robusta, inspirada nos princípios da **Clean Architecture**, aplicada ao contexto de desenvolvimento mobile com **React Native** e **Expo**.

## 🎯 Objetivo Educacional

O foco deste repositório é ensinar como desacoplar a lógica de negócios da interface do usuário (UI), facilitando a testabilidade, manutenção e escalabilidade do código.

Os alunos aprenderão sobre:
- Separação de responsabilidades.
- Inversão de Dependência e Injeção de Dependência.
- Criação de ViewModels para gerenciar o estado da UI.
- Implementação de Use Cases para regras de negócio.
- Definição de contratos (Interfaces) para serviços externos.

## 🏗️ Arquitetura do Projeto

O projeto está estruturado nas seguintes camadas:

### 1. View (`src/app`)
- Responsável apenas pela **renderização da interface** e captura de eventos do usuário.
- Utiliza **Expo Router** para navegação.
- **Não contém regras de negócio**.
- Observa o `ViewModel` para reagir a mudanças de estado.

### 2. ViewModel (`src/viewmodel`)
- Atua como um intermediário entre a View e a camada de Domínio (UseCases).
- Gerencia o **estado da tela** (loading, erros, dados).
- Exponibiliza comandos (funções) para a View interagir.
- Não depende de frameworks de UI (embora use hooks do React para reatividade neste exemplo).

### 3. Use Case (`src/usecase`)
- Contém as **regras de negócio da aplicação**.
- Orquestra o fluxo de dados entre as Entidades e os Serviços.
- Independente de UI e de implementações concretas de infraestrutura (banco de dados, API).

### 4. Model (`src/model`)
- **Entities**: Objetos de domínio puro (ex: `User`).
- **Interfaces (Services)**: Contratos que definem como a aplicação interage com o mundo externo (ex: `IAuthService`).
- **Errors**: Definições de erros de domínio.

### 5. Infra (`src/infra`)
- Implementações concretas das interfaces definidas no Model.
- Exemplo: `FakeAuthService` simula uma API de autenticação.

### 6. Dependency Injection (`src/di`)
- Configuração centralizada das dependências.
- Responsável por instanciar os serviços e injetá-los nos Use Cases e ViewModels.

## 📂 Estrutura de Pastas

```
src/
├── app/            # Telas e Navegação (View)
├── viewmodel/      # Lógica de apresentação (ViewModel)
├── usecase/        # Regras de negócio (Use Cases)
├── model/          # Entidades e Interfaces (Domain)
│   ├── entities/
│   ├── errors/
│   └── services/
├── infra/          # Implementações externas (Infrastructure)
└── di/             # Injeção de Dependência (Dependency Injection)
```

## 🚀 Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute o projeto:**
   ```bash
   npx expo start
   ```

3. **Teste no dispositivo:**
   - Utilize o aplicativo **Expo Go** no seu celular para escanear o QR Code.
   - Ou execute em um emulador Android/iOS.

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript**
- **React Native Paper** (UI Kit)
- **Expo Router** (Navegação)

## 📚 Conceitos Chave

- **MVVM**: O ViewModel expõe dados observáveis e comandos. A View "assina" essas mudanças.
- **Clean Architecture**: As camadas internas (Model/UseCase) não conhecem as externas (View/Infra). A comunicação é feita através de interfaces (Inversão de Dependência).
- **Dependency Injection**: As dependências (ex: AuthService) são injetadas, não instanciadas diretamente dentro das classes que as consomem.

---
Desenvolvido para fins educacionais.
