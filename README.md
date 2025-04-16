Klubi Challenge 2025
===

Este repositório contém o projeto de um buscador de carros para compra, como parte de um desafio técnico. A aplicação foi construída com o objetivo de fornecer uma experiência de usuário intuitiva, rápida e eficaz, permitindo que o usuário encontre veículos de acordo com seus critérios de busca.

## Features

- **Interface Web com React**  

  A aplicação possui uma interface desenvolvida em React, onde os usuários podem visualizar todos os carros disponíveis. A busca é facilitada com recursos de filtro por nome, modelo, localização e faixa de preço, proporcionando uma experiência fluida e eficiente.

- **API Backend em Go**  

  O backend foi implementado em Go e expõe uma API que se conecta a modelos LLM via **Ollama**. A comunicação acontece por **WebSocket**, permitindo a troca de mensagens em tempo real.

  As respostas dos modelos LLM são enviadas em streaming, garantindo uma experiência mais rápida e contínua durante a conversa, sem travamentos ou carregamentos demorados.

## Rodando a Aplicação

Este projeto é composto por duas partes: **frontend** (React) e **backend** (Go). A comunicação entre o frontend e o backend é feita via WebSocket, e o backend também é responsável por interagir com modelos LLM via Ollama.

### Dependências

Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- [Go](https://golang.org/doc/install) (versão 1.21+)
- [Docker](https://docs.docker.com/get-docker/)
- [Make](https://www.gnu.org/software/make/)
- [Bun](https://bun.sh/)

### Passos para execução

#### 1. Clonar o repositório

```bash
git clone https://github.com/guilherme-n-l/klubi-challenge-2025.git
cd klubi-challenge-2025
```

#### 2. Subir a aplicação

```bash
make
```

## Plano de Negócios

Como parte dos requisitos do desafio, esta seção apresenta um Plano de Negócios para o buscador de carros. O objetivo é demonstrar uma visão estratégica sobre como o produto poderia ser lançado e escalado no mercado, cobrindo pontos como modelo de monetização, aquisição e retenção de usuários, além de estimativas de valor e custo.

### 1. Modelo de Negócios

O modelo de negócios seria baseado em **marketplace com comissionamento por venda**. A plataforma conectaria vendedores (lojas e pessoas físicas) a compradores interessados, cobrando uma comissão sobre cada transação realizada pela plataforma. Também seria possível oferecer planos premium para vendedores, com destaque nos resultados de busca, analytics e relatórios de performance.

### 2. Estratégia de Aquisição de Usuários

Para atrair os primeiros usuários, seriam utilizadas estratégias como:

- **Parcerias com lojas locais** para disponibilização de inventário inicial.
- **Campanhas de mídia paga** (Google Ads e redes sociais) focadas em compradores ativos de veículos.
- **Programa de indicação**: benefícios para usuários que indicarem novos compradores ou vendedores.

### 3. Estimativa de CAC (Custo de Aquisição de Cliente)

Considerando um investimento inicial em tráfego pago, o CAC estimado ficaria entre **R$ 20 e R$ 50**, dependendo do canal de aquisição. Com otimização contínua de campanhas e crescimento orgânico, esse custo tende a diminuir com o tempo.

### 4. Proposta de LTV (Lifetime Value)

Com a criação de funcionalidades adicionais (ex: gestão de veículos, manutenção, revenda futura), é possível estender a permanência do usuário. O LTV estimado seria de **R$ 200 a R$ 500** por usuário, podendo aumentar com a adoção de serviços complementares.

### 5. Monetização Viável

As fontes de receita mais viáveis seriam:

- **Comissão por venda** (principal fonte)
- **Planos premium para vendedores**
- **Publicidade segmentada**
- **Serviços financeiros integrados**: seguros, financiamento, vistoria etc.
- **Marketplace de serviços automotivos** (pós-venda): oficinas, peças, manutenção

### 6. Estratégias de Retenção

Para manter os usuários ativos, seriam aplicadas estratégias como:

- **Notificações personalizadas** (variação de preços, novos modelos, promoções)
- **Favoritos e alertas de busca salvos**
- **Histórico de buscas e recomendações com base em comportamento**
- **Experiência contínua com serviços pós-compra** (agendamento de manutenção, lembretes, revenda facilitada)

## Agradecimentos

Gostaria de agradecer à **Klubi** pela proposta do desafio técnico e pela oportunidade de desenvolver uma aplicação completa e desafiadora.

Um agradecimento especial à **Paula Lee** pelas ilustrações utilizadas na interface, que ajudaram a tornar a experiência mais visual e agradável.  
