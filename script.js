"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".section-title, .service-card, .project, .about > div, .contact-content, .raven-price-card, .raven-steps > div");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    elementos.forEach((elemento) => { elemento.classList.add("reveal"); observador.observe(elemento); });
  }

  // Configure o número comercial com DDI + DDD + número, apenas dígitos.
  // Exemplo fictício: "5582999999999". Deixe vazio para o usuário escolher o destinatário.
  const WHATSAPP_RAVEN = "";
  const resumo = document.getElementById("ravenSelectedSummary");
  const opcoes = [...document.querySelectorAll('input[name="servico"]')];
  function escolherServico(valor) {
    const opcao = opcoes.find(input => input.value === valor) || (valor === "Criação de Sites" ? opcoes.find(input => input.value.startsWith("Raven Start")) : null);
    if (!opcao) return;
    opcao.checked = true;
    atualizarEscolha();
  }
  function atualizarEscolha() {
    const selecionado = document.querySelector('input[name="servico"]:checked');
    if (resumo) resumo.textContent = selecionado ? `✓ Selecionado: ${selecionado.value}` : "Nenhuma opção selecionada ainda.";
  }
  opcoes.forEach(opcao => opcao.addEventListener("change", atualizarEscolha));
  window.ravenEscolherServico = escolherServico;
  document.querySelectorAll(".raven-select-plan").forEach((link) => {
    link.addEventListener("click", () => {
      escolherServico(link.dataset.plan || "");
    });
  });
  const formulario = document.getElementById("ravenQuoteForm");
  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    const nome = document.getElementById("ravenName").value.trim();
    const negocio = document.getElementById("ravenBusiness").value.trim();
    const escolha = document.querySelector('input[name="servico"]:checked')?.value || "";
    const prazo = document.getElementById("ravenDeadline").value;
    const detalhes = document.getElementById("ravenDetails").value.trim();
    const mensagem = `Olá! Gostaria de solicitar um orçamento na Raven Creatives Studios.\n\nNome: ${nome}\nNegócio: ${negocio || "Não informado"}\nServiço: ${escolha}\nPrazo: ${prazo}\nDetalhes: ${detalhes || "A combinar"}`;
    const numero = WHATSAPP_RAVEN.replace(/\D/g, "");
    const url = numero ? `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}` : `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
    document.getElementById("ravenQuoteStatus").textContent = numero ? "Abrindo conversa com a Raven. Confirme o envio no WhatsApp." : "Escolha o destinatário no WhatsApp. Para envio direto à Raven, configure WHATSAPP_RAVEN no script.js.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
  const contato = document.getElementById("whatsappButton");
  if (contato) {
    contato.href = WHATSAPP_RAVEN ? `https://wa.me/${WHATSAPP_RAVEN.replace(/\D/g, "")}` : "#orcamento";
    if (!WHATSAPP_RAVEN) contato.textContent = "Solicitar orçamento";
  }
});


// RAVEN 3.0 — Experience Lab: abas, demonstrações e navegação.
document.addEventListener("DOMContentLoaded", () => {
  const catalogo = [
    { id:"sites", titulo:"Criação de Sites", headline:"Seu negócio merece impressionar.", descricao:"Experiências digitais modernas para apresentar sua marca e transformar visitas em oportunidades.", itens:["Landing pages e páginas de vendas", "Sites institucionais e portfólios", "Catálogos e lojas virtuais sob orçamento", "Integração com WhatsApp e formulários"], servico:"Criação de Sites", demo:"sites", faq:[["Meu site funciona no celular?","Sim. Desenvolvemos layouts responsivos para diferentes tamanhos de tela."],["Posso pedir mudanças?","Sim. As revisões e o escopo são definidos na proposta antes do início."],["Domínio e hospedagem estão inclusos?","Dependem do plano e são especificados no orçamento."]] },
    { id:"pc", titulo:"Manutenção de Computadores", headline:"Mais desempenho. Menos problemas.", descricao:"Diagnóstico e cuidados técnicos para ajudar seu computador a trabalhar melhor.", itens:["Diagnóstico de falhas e lentidão", "Limpeza e manutenção preventiva", "Instalação de SSD e memória", "Configuração de sistemas e programas"], servico:"Manutenção PC", demo:"pc", faq:[["Vocês garantem que o PC ficará mais rápido?","O resultado depende do estado e das especificações do equipamento. Primeiro avaliamos."],["Preciso comprar peças antes?","Não. O diagnóstico pode indicar se algum componente precisa ser substituído."],["O valor é fixo?","O preço depende do serviço e de possíveis peças, sempre com orçamento prévio."]] },
    { id:"suporte", titulo:"Suporte Técnico", headline:"Tecnologia sem complicação.", descricao:"Orientação e assistência para resolver problemas de informática no dia a dia.", itens:["Instalação e configuração de programas", "Correção de erros de software", "Otimização e organização do sistema", "Apoio técnico conforme a necessidade"], servico:"Suporte Técnico", demo:"suporte", faq:[["O suporte pode ser remoto?","Alguns problemas podem ser avaliados remotamente, conforme disponibilidade e segurança."],["Atendem qualquer programa?","A compatibilidade e a possibilidade de atendimento são avaliadas caso a caso."],["Como solicito ajuda?","Use o botão de orçamento e descreva o problema."]] },
    { id:"redes", titulo:"Redes e TI", headline:"Conectividade para seguir em frente.", descricao:"Soluções para organizar a rede e melhorar a experiência de conexão do seu ambiente.", itens:["Configuração de roteadores e Wi-Fi", "Diagnóstico de problemas de conexão", "Configuração de redes locais", "Orientação sobre melhorias da rede"], servico:"Redes e TI", demo:"redes", faq:[["Vocês aumentam a velocidade da internet?","Podemos identificar gargalos locais; a velocidade final também depende do plano e da operadora."],["Atendem redes comerciais?","Avaliamos o tamanho e a complexidade da rede antes de apresentar a proposta."],["É necessário comprar equipamento?","Somente se o diagnóstico indicar e após sua aprovação."]] }
  ];
  const modal=document.getElementById("ravenServiceModal");
  if(!modal) return;
  const dialog=modal.querySelector(".raven-modal-dialog"), titulo=document.getElementById("ravenModalTitle"), descricao=document.getElementById("ravenModalDescription"), lista=document.getElementById("ravenModalList"), cta=document.getElementById("ravenModalCta"), demo=document.getElementById("ravenDemoContent"), faq=document.getElementById("ravenFaqContent"), indicador=document.getElementById("ravenModalIndex");
  const tabs=[...modal.querySelectorAll(".raven-tab")], panels=[...modal.querySelectorAll(".raven-tab-panel")];
  let ultimoFoco=null, indice=0;
  function criar(tag, classe, texto){const el=document.createElement(tag);if(classe)el.className=classe;if(texto)el.textContent=texto;return el;}
  function ativarAba(n){tabs.forEach((tab,i)=>{tab.classList.toggle("is-active",i===n);tab.setAttribute("aria-selected",String(i===n));tab.tabIndex=i===n?0:-1;panels[i].hidden=i!==n;});}
  function montarDemo(d){
    demo.replaceChildren();
    const cab=criar("div","raven-demo-header",d.demo==="sites"?"PRÉVIA DE EXPERIÊNCIA DIGITAL":"EXPLORADOR DE SOLUÇÕES");demo.append(cab);
    if(d.demo==="sites"){
      const browser=criar("div","raven-browser");browser.append(criar("div","raven-browser-bar","● ● ●   raven / preview"));
      const area=criar("div","raven-browser-body");area.append(criar("span","raven-browser-tag","SEU NEGÓCIO, EM DESTAQUE"),criar("h3","","Sua marca. Uma nova presença digital."),criar("p","","Design responsivo • contato rápido • experiência profissional"));
      const link=criar("a","raven-browser-link","Ver projeto Barbearia Imperial ↗");link.href="https://ecadu285-afk.github.io/Barbearia-Imperial/";link.target="_blank";link.rel="noopener noreferrer";area.append(link);browser.append(area);demo.append(browser);
    } else {
      const p=criar("p","raven-demo-lead",d.demo==="pc"?"Explore as etapas de um diagnóstico técnico:":d.demo==="suporte"?"Veja como organizamos um atendimento:":"Conheça os pontos avaliados em uma rede:");demo.append(p);
      const passos=d.demo==="pc"?["Identificar sintomas","Verificar componentes","Propor solução"]:d.demo==="suporte"?["Entender o problema","Avaliar alternativas","Orientar a solução"]:["Avaliar sinal e cobertura","Verificar equipamentos","Sugerir melhorias"];
      const wrap=criar("div","raven-demo-steps");passos.forEach((passo,i)=>{const item=criar("div","raven-demo-step");item.append(criar("span","",String(i+1).padStart(2,"0")),criar("strong","",passo));wrap.append(item);});demo.append(wrap);
      demo.append(criar("p","raven-demo-note","Demonstração ilustrativa. A avaliação real depende do equipamento ou ambiente."));
    }
  }
  function mostrar(i){indice=(i+catalogo.length)%catalogo.length;const d=catalogo[indice];titulo.textContent=d.headline;descricao.textContent=d.descricao;indicador.textContent=`0${indice+1} / 04 · ${d.titulo.toUpperCase()}`;lista.replaceChildren(...d.itens.map(item=>criar("li","",item)));cta.dataset.plan=d.servico;montarDemo(d);faq.replaceChildren(...d.faq.map(([pergunta,resposta])=>{const details=criar("details","raven-faq-item");details.append(criar("summary","",pergunta),criar("p","",resposta));return details;}));ativarAba(0);}
  function abrir(i,origem){ultimoFoco=origem;mostrar(i);modal.hidden=false;document.body.classList.add("raven-modal-open");dialog.focus();}
  function fechar(){modal.hidden=true;document.body.classList.remove("raven-modal-open");ultimoFoco?.focus();}
  document.querySelectorAll("[data-raven-service]").forEach(botao=>botao.addEventListener("click",()=>{const i=catalogo.findIndex(s=>s.id===botao.dataset.ravenService);if(i>=0)abrir(i,botao);}));
  modal.querySelectorAll("[data-raven-close]").forEach(el=>el.addEventListener("click",fechar));
  tabs.forEach((tab,i)=>tab.addEventListener("click",()=>ativarAba(i)));
  document.getElementById("ravenModalNext").addEventListener("click",()=>{mostrar(indice+1);dialog.focus();});
  cta.addEventListener("click",()=>{window.ravenEscolherServico?.(cta.dataset.plan);fechar();});
  document.addEventListener("keydown",evento=>{
    if(modal.hidden)return;
    if(evento.key==="Escape"){evento.preventDefault();fechar();return;}
    if(evento.key==="Tab"){
      const focaveis=[...dialog.querySelectorAll('button:not([disabled]):not([tabindex="-1"]),a[href],summary')].filter(el=>el.getClientRects().length>0);
      const primeiro=focaveis[0],ultimo=focaveis[focaveis.length-1];if(!primeiro)return;
      if(evento.shiftKey&&(document.activeElement===primeiro||document.activeElement===dialog)){evento.preventDefault();ultimo.focus();}
      else if(!evento.shiftKey&&document.activeElement===ultimo){evento.preventDefault();primeiro.focus();}
    }
  });
});


// RAVEN 3.2 — catálogo de serviços e seleção integrada ao orçamento.
document.addEventListener("DOMContentLoaded", () => {
  const servicos = [{"id": "raven-0", "nome": "Landing pages", "categoria": "Web", "descricao": "Página única para apresentar sua oferta e captar contatos.", "preco": "A partir de R$ 450", "recursos": ["Design responsivo", "Seções de apresentação", "Botão de WhatsApp", "Formulário simples"], "status": "avaliar"}, {"id": "raven-1", "nome": "Sites institucionais", "categoria": "Web", "descricao": "Site completo para apresentar empresas e serviços.", "preco": "A partir de R$ 990", "recursos": ["Até cinco páginas no plano Business", "Contato", "Portfólio", "SEO básico"], "status": "avaliar"}, {"id": "raven-2", "nome": "Portfólios profissionais", "categoria": "Web", "descricao": "Vitrine digital de trabalhos, competências e projetos.", "preco": "A partir de R$ 400", "recursos": ["Galeria de projetos", "Sobre", "Links profissionais", "Contato"], "status": "avaliar"}, {"id": "raven-3", "nome": "Catálogos digitais", "categoria": "Web", "descricao": "Mostre produtos ou serviços com pedidos via WhatsApp.", "preco": "A partir de R$ 350", "recursos": ["Produtos e imagens", "Categorias", "Contato", "Responsividade"], "status": "avaliar"}, {"id": "raven-4", "nome": "Lojas virtuais", "categoria": "Web", "descricao": "Comércio eletrônico com catálogo e carrinho.", "preco": "A partir de R$ 1.800", "recursos": ["Catálogo", "Carrinho", "Integração de pagamentos sob análise", "Administração"], "status": "avancado"}, {"id": "raven-5", "nome": "Cardápios digitais", "categoria": "Web", "descricao": "Cardápio organizado para restaurantes e delivery.", "preco": "Sob orçamento", "recursos": ["Categorias", "Itens e preços", "Contato", "Visualização mobile"], "status": "avaliar"}, {"id": "raven-6", "nome": "Modernização de sites", "categoria": "Web", "descricao": "Atualização visual e melhorias de sites existentes.", "preco": "A partir de R$ 300", "recursos": ["Revisão de layout", "Responsividade", "Performance básica", "Correções visuais"], "status": "avaliar"}, {"id": "raven-7", "nome": "Blogs e portais", "categoria": "Web", "descricao": "Publicação de artigos, notícias e conteúdos.", "preco": "Sob orçamento", "recursos": ["Páginas de conteúdo", "Categorias", "Busca sob escopo", "Painel editorial sob análise"], "status": "avancado"}, {"id": "raven-8", "nome": "Manutenção de computadores", "categoria": "TI", "descricao": "Diagnóstico, limpeza e upgrades de PCs.", "preco": "Sob orçamento", "recursos": ["Avaliação de falhas", "Limpeza preventiva", "SSD e RAM", "Orientação de peças"], "status": "avaliar"}, {"id": "raven-9", "nome": "Suporte técnico", "categoria": "TI", "descricao": "Ajuda com programas, sistemas e erros de informática.", "preco": "Sob orçamento", "recursos": ["Configuração de software", "Drivers", "Diagnóstico", "Suporte remoto quando viável"], "status": "avaliar"}, {"id": "raven-10", "nome": "Redes e Wi-Fi", "categoria": "TI", "descricao": "Configuração de roteadores e conectividade local.", "preco": "Sob orçamento", "recursos": ["Wi-Fi", "Roteadores", "Rede local", "Diagnóstico de sinal"], "status": "avaliar"}, {"id": "raven-11", "nome": "Backup e migração", "categoria": "TI", "descricao": "Organização e cópia de segurança de arquivos.", "preco": "A partir de R$ 80", "recursos": ["Plano de backup", "Cópias locais ou nuvem", "Migração assistida", "Verificação de integridade"], "status": "avaliar"}, {"id": "raven-12", "nome": "Montagem e upgrades", "categoria": "TI", "descricao": "Montagem de computadores e substituição de componentes.", "preco": "Sob orçamento", "recursos": ["Compatibilidade", "Montagem", "Instalação", "Testes básicos"], "status": "avaliar"}, {"id": "raven-13", "nome": "Domínios e hospedagem", "categoria": "TI", "descricao": "Publicação de sites e configuração de domínio.", "preco": "A partir de R$ 100 + taxas", "recursos": ["DNS", "GitHub Pages ou hospedagem adequada", "HTTPS conforme provedor", "Publicação"], "status": "avaliar"}, {"id": "raven-14", "nome": "Identidade visual", "categoria": "Digital", "descricao": "Elementos visuais para fortalecer uma marca.", "preco": "A partir de R$ 250", "recursos": ["Logo", "Paleta de cores", "Tipografia", "Aplicações básicas"], "status": "avaliar"}, {"id": "raven-15", "nome": "WhatsApp Business", "categoria": "Digital", "descricao": "Organização do atendimento comercial.", "preco": "A partir de R$ 100", "recursos": ["Perfil comercial", "Catálogo", "Etiquetas", "Mensagens de saudação"], "status": "avaliar"}, {"id": "raven-16", "nome": "Perfil da Empresa no Google", "categoria": "Digital", "descricao": "Configuração de informações comerciais públicas.", "preco": "A partir de R$ 150", "recursos": ["Dados comerciais", "Horários", "Fotos", "Orientação para verificação"], "status": "avaliar"}, {"id": "raven-17", "nome": "SEO inicial", "categoria": "Digital", "descricao": "Melhorias para buscadores encontrarem seu site.", "preco": "A partir de R$ 200", "recursos": ["Títulos", "Descrições", "Estrutura semântica", "Revisão de desempenho"], "status": "avaliar"}, {"id": "raven-18", "nome": "Materiais promocionais", "categoria": "Digital", "descricao": "Banners, cartões e peças de divulgação.", "preco": "Sob orçamento", "recursos": ["Artes digitais", "Formatos para redes", "Revisões definidas", "Entrega de arquivos"], "status": "avaliar"}, {"id": "raven-19", "nome": "Sistemas de agendamento", "categoria": "Sistemas", "descricao": "Reservas de horários para serviços e atendimentos.", "preco": "A partir de R$ 450 (versão simples)", "recursos": ["Seleção de serviço", "Data e horário", "Envio via WhatsApp", "Agenda real requer backend"], "status": "avaliar"}, {"id": "raven-20", "nome": "Formulários inteligentes", "categoria": "Sistemas", "descricao": "Coleta de dados e solicitações organizadas.", "preco": "A partir de R$ 350", "recursos": ["Campos condicionais", "Validação", "Resumo de pedido", "Integrações sob análise"], "status": "avaliar"}, {"id": "raven-21", "nome": "Automação de planilhas", "categoria": "Sistemas", "descricao": "Redução de tarefas repetitivas em relatórios.", "preco": "Sob orçamento", "recursos": ["Importação de dados", "Cálculos", "Relatórios", "Automatização de rotinas"], "status": "avaliar"}, {"id": "raven-22", "nome": "CRM para clientes", "categoria": "Sistemas", "descricao": "Gestão de contatos, oportunidades e propostas.", "preco": "Projeto futuro", "recursos": ["Cadastro de clientes", "Funil de vendas", "Histórico", "Permissões e segurança"], "status": "futuro"}, {"id": "raven-23", "nome": "Controle de estoque", "categoria": "Sistemas", "descricao": "Gestão de produtos, entradas e saídas.", "preco": "Projeto futuro", "recursos": ["Produtos", "Movimentações", "Alertas", "Relatórios"], "status": "futuro"}, {"id": "raven-24", "nome": "Gestão financeira", "categoria": "Sistemas", "descricao": "Controle de receitas, despesas e cobranças.", "preco": "Projeto futuro", "recursos": ["Lançamentos", "Relatórios", "Fluxo de caixa", "Controle de acesso"], "status": "futuro"}, {"id": "raven-25", "nome": "Chatbots e assistentes", "categoria": "Sistemas", "descricao": "Atendimento automatizado com regras ou IA.", "preco": "Sob análise técnica", "recursos": ["Fluxos de conversa", "Base de respostas", "Integrações autorizadas", "Supervisão humana"], "status": "avancado"}, {"id": "raven-26", "nome": "Aplicativos web (PWA)", "categoria": "Apps", "descricao": "Aplicativos instaláveis a partir do navegador.", "preco": "Projeto futuro", "recursos": ["Design mobile", "Instalação", "Recursos offline quando viável", "Notificações sob análise"], "status": "futuro"}, {"id": "raven-27", "nome": "Aplicativos móveis", "categoria": "Apps", "descricao": "Apps para Android e iOS conforme projeto.", "preco": "Projeto futuro", "recursos": ["Protótipo", "Telas", "Backend", "Publicação em lojas sob análise"], "status": "futuro"}, {"id": "raven-28", "nome": "Raven Agenda", "categoria": "Produtos Raven", "descricao": "Plataforma própria de agendamento por assinatura.", "preco": "Em planejamento", "recursos": ["Agenda", "Clientes", "Serviços", "Painel de gestão"], "status": "futuro"}, {"id": "raven-29", "nome": "Raven Commerce", "categoria": "Produtos Raven", "descricao": "Plataforma própria para catálogos e pedidos.", "preco": "Em planejamento", "recursos": ["Produtos", "Pedidos", "Painel", "Relatórios"], "status": "futuro"}, {"id": "raven-30", "nome": "Raven CRM", "categoria": "Produtos Raven", "descricao": "Sistema próprio de relacionamento com clientes.", "preco": "Em planejamento", "recursos": ["Contatos", "Oportunidades", "Propostas", "Histórico"], "status": "futuro"}, {"id": "raven-31", "nome": "Raven Support", "categoria": "Produtos Raven", "descricao": "Sistema próprio de chamados e assistência.", "preco": "Em planejamento", "recursos": ["Chamados", "Status", "Atendimentos", "Histórico"], "status": "futuro"}, {"id": "raven-32", "nome": "Raven Hub", "categoria": "Produtos Raven", "descricao": "Painel central de gestão dos serviços Raven.", "preco": "Em planejamento", "recursos": ["Clientes", "Projetos", "Orçamentos", "Assinaturas"], "status": "futuro"}];
  const grid = document.getElementById("ravenCatalogGrid");
  const filtros = document.getElementById("ravenCatalogFilters");
  const busca = document.getElementById("ravenCatalogSearch");
  const modal = document.getElementById("ravenCatalogModal");
  const dialog = modal?.querySelector(".raven-catalog-dialog");
  const extras = document.getElementById("ravenExtraChoices");
  if (!grid || !filtros || !modal || !extras) return;
  let categoria = "Todos", ultimoFoco = null, atual = null;
  const criar = (tag, classe, texto) => {const el=document.createElement(tag);if(classe)el.className=classe;if(texto!==undefined)el.textContent=texto;return el;};
  const statusNome = s => s.status === "futuro" ? "Em planejamento" : s.status === "avancado" ? "Sob análise técnica" : "Consultar disponibilidade";
  // Mantemos os nove cartões originais e adicionamos os novos serviços sem duplicá-los.
  const existentes = new Set([...document.querySelectorAll('input[name="servico"]')].map(x => x.value.toLowerCase()));
  const equivalentes = new Set(['Landing pages','Sites institucionais','Manutenção de computadores','Suporte técnico','Redes e Wi-Fi']);
  servicos.filter(s=>!equivalentes.has(s.nome)).forEach(s=>{
    const label=criar('label','raven-choice-card');
    const radio=criar('input');radio.type='radio';radio.name='servico';radio.value=s.nome;radio.required=true;
    const content=criar('span','raven-choice-content');
    content.append(criar('span','raven-choice-check','✓'),criar('strong','',s.nome),criar('b','',s.preco),criar('small','',s.descricao));
    label.append(radio,content);extras.append(label);
    radio.addEventListener('change',()=>{const summary=document.getElementById('ravenSelectedSummary');if(summary)summary.textContent='✓ Selecionado: '+radio.value;});
  });
  // RAVEN 3.3 — vitrines horizontais agrupadas em quatro departamentos.
  const departamentos = [
    {nome:'Desenvolvimento', descricao:'Sites, lojas, portfólios e aplicativos', categorias:['Web','Apps']},
    {nome:'Sistemas e IA', descricao:'Automação, gestão e produtos em planejamento', categorias:['Sistemas','Produtos Raven']},
    {nome:'Informática e TI', descricao:'Computadores, redes, backups e hospedagem', categorias:['TI']},
    {nome:'Design e Presença Digital', descricao:'Marca, divulgação e presença online', categorias:['Digital']}
  ];
  filtros.hidden = true;
  function criarCard(s){
    const card=criar('article','raven-catalog-card');
    const status=criar('span','raven-catalog-status'+(s.status==='futuro'?' future':''),statusNome(s));
    const btn=criar('button','','Ver detalhes ↗');btn.type='button';btn.addEventListener('click',()=>abrir(s,btn));
    card.append(criar('span','raven-catalog-category',s.categoria),criar('h3','',s.nome),criar('p','',s.descricao),criar('strong','',s.preco),status,btn);
    return card;
  }
  function render(){
    const q=busca.value.trim().toLocaleLowerCase('pt-BR');
    const encontrados=servicos.filter(s=>[s.nome,s.descricao,s.categoria,...s.recursos].join(' ').toLocaleLowerCase('pt-BR').includes(q));
    grid.replaceChildren();
    departamentos.forEach(depto=>{
      const itens=encontrados.filter(s=>depto.categorias.includes(s.categoria));
      if(!itens.length)return;
      const sec=criar('section','raven-shelf');
      const cab=criar('div','raven-shelf-heading');
      const nome=criar('div','raven-shelf-name');nome.append(criar('h3','',depto.nome),criar('p','',depto.descricao));
      const controles=criar('div','raven-shelf-controls');
      const anterior=criar('button','raven-shelf-arrow','←');anterior.type='button';anterior.setAttribute('aria-label','Rolar '+depto.nome+' para a esquerda');
      const proximo=criar('button','raven-shelf-arrow','→');proximo.type='button';proximo.setAttribute('aria-label','Rolar '+depto.nome+' para a direita');
      controles.append(anterior,proximo);cab.append(nome,controles);
      const trilho=criar('div','raven-shelf-track');trilho.setAttribute('role','region');trilho.setAttribute('aria-label','Serviços de '+depto.nome);trilho.tabIndex=0;
      itens.forEach(s=>trilho.append(criarCard(s)));
      const atualizar=()=>{anterior.disabled=trilho.scrollLeft<4;proximo.disabled=trilho.scrollLeft+trilho.clientWidth>=trilho.scrollWidth-4;};
      anterior.addEventListener('click',()=>trilho.scrollBy({left:-Math.max(240,trilho.clientWidth*.8),behavior:'smooth'}));
      proximo.addEventListener('click',()=>trilho.scrollBy({left:Math.max(240,trilho.clientWidth*.8),behavior:'smooth'}));
      trilho.addEventListener('scroll',atualizar,{passive:true});
      if('ResizeObserver' in window)new ResizeObserver(atualizar).observe(trilho);
      sec.append(cab,trilho);grid.append(sec);requestAnimationFrame(atualizar);
    });
    document.getElementById('ravenCatalogCount').textContent=encontrados.length+' de '+servicos.length+' serviços e projetos';
    if(!encontrados.length)grid.append(criar('p','','Nenhum serviço encontrado. Experimente outro termo.'));
  }
  function abrir(s,origem){atual=s;ultimoFoco=origem;
    document.getElementById('ravenCatalogModalCategory').textContent=s.categoria+' · '+statusNome(s);
    document.getElementById('ravenCatalogModalTitle').textContent=s.nome;
    document.getElementById('ravenCatalogModalDesc').textContent=s.descricao;
    document.getElementById('ravenCatalogModalPrice').textContent=s.preco;
    document.getElementById('ravenCatalogModalCaution').textContent=s.status==='futuro'?'Produto em planejamento: ainda não está disponível para contratação. Você pode registrar seu interesse.':s.status==='avancado'?'Serviço sujeito a avaliação de viabilidade, escopo e disponibilidade.':'Escopo, prazo, custos externos e disponibilidade serão confirmados na proposta.';
    document.getElementById('ravenCatalogModalFeatures').replaceChildren(...s.recursos.map(x=>criar('li','',x)));
    document.getElementById('ravenCatalogModalQuote').textContent=s.status==='futuro'?'Registrar interesse ↗':'Solicitar avaliação ↗';
    modal.hidden=false;document.body.classList.add('raven-catalog-modal-open');dialog.focus();
  }
  function fechar(){modal.hidden=true;document.body.classList.remove('raven-catalog-modal-open');ultimoFoco?.focus();}
  modal.querySelectorAll('[data-catalog-close]').forEach(x=>x.addEventListener('click',fechar));
  document.getElementById('ravenCatalogModalQuote').addEventListener('click',()=>{
    if(!atual)return;
    const radios=[...document.querySelectorAll('input[name="servico"]')];
    const r=radios.find(x=>x.value===atual.nome) || (atual.nome==='Landing pages'?radios.find(x=>x.value.startsWith('Raven Start')):null) || (atual.nome==='Sites institucionais'?radios.find(x=>x.value.startsWith('Raven Business')):null) || (atual.nome==='Manutenção de computadores'?radios.find(x=>x.value==='Manutenção PC'):null) || (atual.nome==='Redes e Wi-Fi'?radios.find(x=>x.value==='Redes e TI'):null);
    if(r){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));}
    fechar();
  });
  busca.addEventListener('input',render);
  document.addEventListener('keydown',e=>{
    if(modal.hidden)return;
    if(e.key==='Escape'){e.preventDefault();fechar();}
    if(e.key==='Tab'){
      const els=[...dialog.querySelectorAll('button,a[href]')].filter(el=>el.getClientRects().length);
      const first=els[0],last=els[els.length-1];
      if(e.shiftKey&&(document.activeElement===first||document.activeElement===dialog)){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  render();
});
