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
