# Weather App Mobile

Aplicativo **mobile** desenvolvido em **React Native** utilizando **Expo** para consultar condições climáticas em tempo real, baseado na localização do usuário ou em cidades pesquisadas.

---

## 🎯 Objetivos
- Obter automaticamente a localização atual do usuário.
- Buscar manualmente o clima de qualquer cidade.
- Exibir informações meteorológicas principais: temperatura, sensação térmica, clima, umidade, vento.
- Mostrar ícone dinâmico conforme o clima.
- Design responsivo e amigável.

---

## 🗂️ Sumário
1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Instalação](#instalação)
3. [Como Executar](#como-executar)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades](#funcionalidades)
6. [Contribuição](#contribuição)
7. [Licença](#licença)

---

## 🛠️ Tecnologias Utilizadas
- **Framework:** React Native (Expo)
- **Linguagem:** TypeScript
- **Bibliotecas:**
  - **Expo Location:** para obter a localização GPS do usuário.
  - **Axios:** para fazer requisições HTTP.
  - **React Navigation:** para navegação entre telas (caso expandido).
- **API:** OpenWeatherMap (ou outra API de clima).

---

## 🚀 Instalação
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/devalvesg/weather-app-mobile.git
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd weather-app-mobile
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

---

## ▶️ Como Executar
- Certifique-se de ter o Expo CLI instalado:
  ```bash
  npm install -g expo-cli
  ```
- Execute o projeto:
  ```bash
  expo start
  ```
- Escaneie o QR Code no Expo Go App para testar no seu dispositivo físico, ou use um emulador Android/iOS.

---

## 📂 Estrutura do Projeto
```
weather-app-mobile/
├── assets/             # Ícones, imagens e fontes
├── components/         # Componentes reutilizáveis (ex: WeatherCard)
├── services/           # Serviços para chamadas de API (ex: weatherService.ts)
├── screens/            # Telas principais (ex: HomeScreen.tsx)
├── App.tsx             # Arquivo principal de inicialização
├── app.json            # Configurações do Expo
├── tsconfig.json       # Configuração do TypeScript
├── package.json        # Dependências e scripts
└── README.md           # Documentação do projeto
```

---

## ✨ Funcionalidades
- **Permissão de Localização:** Solicita ao usuário o acesso ao GPS.
- **Clima Atual:** Obtém a temperatura e condição meteorológica atual com base na geolocalização.
- **Busca de Cidades:** Permite consultar a previsão de qualquer cidade digitada.
- **Ícones Dinâmicos:** Exibe ícones de clima (ex: nublado, ensolarado, chuvoso).
- **Atualização em Tempo Real:** Refresca os dados quando o usuário solicita.

---

## 🤝 Contribuição
1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`).
3. Commit suas alterações (`git commit -m 'Adicionando nova feature'`).
4. Push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request.

---

## 📜 Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
