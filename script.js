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
  const servico = document.getElementById("ravenService");
  document.querySelectorAll(".raven-select-plan").forEach((link) => {
    link.addEventListener("click", () => {
      if (servico) servico.value = link.dataset.plan || "";
    });
  });
  const formulario = document.getElementById("ravenQuoteForm");
  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    const nome = document.getElementById("ravenName").value.trim();
    const negocio = document.getElementById("ravenBusiness").value.trim();
    const escolha = servico.value;
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


// RAVEN 2.1 — Detalhes dos quatro serviços do painel.
document.addEventListener("DOMContentLoaded", () => {
  const catalogo = {
    sites: { titulo:"Criação de Sites", descricao:"Projetos responsivos para apresentar sua marca e facilitar o contato com clientes.", itens:["Landing pages e páginas de vendas", "Sites institucionais e portfólios", "Catálogos e lojas virtuais sob orçamento", "Integração com WhatsApp e formulários"], servico:"Criação de Sites" },
    pc: { titulo:"Manutenção de Computadores", descricao:"Serviços de diagnóstico e manutenção conforme a necessidade do equipamento.", itens:["Diagnóstico de problemas", "Limpeza e manutenção preventiva", "Instalação de SSD e memória", "Instalação e configuração de sistemas"], servico:"Manutenção PC" },
    suporte: { titulo:"Suporte Técnico", descricao:"Assistência para resolver problemas de informática no dia a dia.", itens:["Configuração de programas", "Correção de erros de software", "Otimização básica de computadores", "Orientação e suporte técnico"], servico:"Suporte Técnico" },
    redes: { titulo:"Redes e TI", descricao:"Soluções de conectividade para residências e pequenos negócios.", itens:["Configuração de roteadores e Wi-Fi", "Diagnóstico de conectividade", "Configuração de redes locais", "Orientação para melhorias da rede"], servico:"Redes e TI" }
  };
  const modal=document.getElementById("ravenServiceModal");
  if (!modal) return;
  const dialog=modal.querySelector(".raven-modal-dialog");
  const titulo=document.getElementById("ravenModalTitle");
  const descricao=document.getElementById("ravenModalDescription");
  const lista=document.getElementById("ravenModalList");
  const cta=document.getElementById("ravenModalCta");
  let ultimoFoco=null;
  function fechar(){ modal.hidden=true; document.body.classList.remove("raven-modal-open"); ultimoFoco?.focus(); }
  document.querySelectorAll("[data-raven-service]").forEach(botao=>{
    botao.addEventListener("click",()=>{
      const dados=catalogo[botao.dataset.ravenService]; if(!dados)return;
      ultimoFoco=botao;
      titulo.textContent=dados.titulo;
      descricao.textContent=dados.descricao;
      lista.replaceChildren(...dados.itens.map(item=>{const li=document.createElement("li");li.textContent=item;return li;}));
      cta.dataset.plan=dados.servico;
      modal.hidden=false;document.body.classList.add("raven-modal-open");dialog.focus();
    });
  });
  modal.querySelectorAll("[data-raven-close]").forEach(el=>el.addEventListener("click",fechar));
  cta.addEventListener("click",()=>{
    const servico=document.getElementById("ravenService");
    if(servico){ const opcao=[...servico.options].find(o=>o.value===cta.dataset.plan); if(opcao)servico.value=opcao.value; }
    fechar();
  });
  document.addEventListener("keydown",evento=>{
    if(modal.hidden)return;
    if(evento.key==="Escape"){evento.preventDefault();fechar();return;}
    if(evento.key==="Tab"){
      const focaveis=[...dialog.querySelectorAll('button:not([disabled]),a[href]')];
      const primeiro=focaveis[0],ultimo=focaveis[focaveis.length-1];
      if(evento.shiftKey && document.activeElement===primeiro){evento.preventDefault();ultimo.focus();}
      else if(!evento.shiftKey && document.activeElement===ultimo){evento.preventDefault();primeiro.focus();}
      else if(document.activeElement===dialog && evento.shiftKey){evento.preventDefault();ultimo.focus();}
    }
  });
});
