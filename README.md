# Checkout Pro - Plataforma de Checkouts Personalizáveis

Uma plataforma moderna e flexível para criar e gerenciar checkouts personalizados para seus produtos digitais e físicos.

## 🚀 Funcionalidades

### Gestão de Checkouts
- Criação de checkouts personalizados
- Upload de imagens de produtos
- Configuração de preços e descrições
- Gestão de múltiplos checkouts
- Order Bumps personalizáveis

### Métodos de Pagamento
- Integração com múltiplos gateways de pagamento
  - Stripe (implementado)
  - Mais gateways em breve
- Suporte para:
  - Cartão de Crédito (com parcelamento)
  - PIX
  - Boleto Bancário

### Order Bumps
- Adicione ofertas complementares
- Configuração de descontos
- Upload de imagens para cada oferta
- Ativação/desativação flexível

### Análises e Relatórios
- Dashboard com métricas principais
- Acompanhamento de vendas
- Análise de conversão
- Relatórios personalizáveis

## 🛠️ Tecnologias Utilizadas

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Zustand (Gerenciamento de Estado)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/checkout-pro.git

# Entre no diretório
cd checkout-pro

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=sua_url_api
VITE_STRIPE_PUBLIC_KEY=sua_chave_publica_stripe
```

### Configuração do Gateway de Pagamento

1. Acesse a seção "Gateways de Pagamento"
2. Selecione o gateway desejado
3. Configure as credenciais necessárias
4. Ative o gateway para uso

## 🔧 Uso

### Criando um Novo Checkout

1. Clique em "Novo Checkout"
2. Configure as informações do produto:
   - Nome
   - Preço
   - Descrição
   - Imagem
3. Adicione Order Bumps (opcional):
   - Produtos complementares
   - Preços com desconto
4. Configure os métodos de pagamento:
   - Selecione o gateway
   - Escolha os métodos aceitos
   - Configure parcelamento (se aplicável)
5. Finalize e obtenha o link do checkout

### Gerenciando Order Bumps

1. Na criação do checkout, vá até a seção "Order Bumps"
2. Clique em "Adicionar Order Bump"
3. Configure:
   - Nome do produto
   - Imagem
   - Preço
   - Desconto
4. Ative/desative conforme necessário

## 📱 Responsividade

A plataforma é totalmente responsiva e otimizada para:
- Desktops
- Tablets
- Smartphones

## 🔒 Segurança

- Integração segura com gateways de pagamento
- Proteção de dados sensíveis
- Conformidade com normas de segurança
- Criptografia de dados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@checkoutpro.com ou abra uma issue no repositório.

## 🔄 Atualizações Futuras

- [ ] Integração com mais gateways de pagamento
- [ ] Sistema de cupons de desconto
- [ ] Checkout em múltiplas línguas
- [ ] Mais opções de personalização
- [ ] API pública para integrações
- [ ] Webhooks personalizáveis 