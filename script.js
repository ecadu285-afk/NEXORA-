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
