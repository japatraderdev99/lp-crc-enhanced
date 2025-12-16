/**
 * Vanilla TypeScript Accordion Component
 * Lightweight alternative to Radix UI Accordion (~800 bytes minified)
 */

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Funciona para clínicas pequenas ou só para redes grandes?",
    answer: "Funciona para qualquer tamanho de clínica. Temos casos de clínicas que saíram de R$20k/mês para R$150k/mês aplicando o método. O processo é o mesmo, independente do tamanho da operação."
  },
  {
    question: "Minha CRC não tem experiência em vendas. Vai funcionar?",
    answer: "Sim! O método foi criado justamente para isso. É didático, prático e passo a passo. Sua CRC não precisa de experiência prévia em vendas - apenas precisa seguir o processo ensinado."
  },
  {
    question: "Em quanto tempo vejo resultados?",
    answer: "Com aplicação correta do método, você começa a ver resultados em 30 dias. Alguns alunos reportam aumento de conversão já na primeira semana de implementação."
  },
  {
    question: "E se não funcionar para minha clínica?",
    answer: "Oferecemos garantia incondicional de 30 dias. Se você aplicar o método e não ver resultados, devolvemos 100% do seu investimento. Sem burocracia."
  },
  {
    question: "Como funciona o acesso ao curso?",
    answer: "O acesso é 100% online e imediato após a confirmação do pagamento. Você pode assistir as aulas quantas vezes quiser, no seu ritmo, de qualquer dispositivo."
  },
  {
    question: "Preciso estar presente nos treinamentos ou posso passar para minha CRC?",
    answer: "Você decide! Pode assistir junto com sua CRC, passar diretamente para ela, ou assistir primeiro e depois repassar. O conteúdo foi pensado para ser facilmente aplicável."
  }
];

export function initAccordion(): void {
  const container = document.querySelector('.faq-accordion');
  if (!container) return;

  // Render FAQ items
  container.innerHTML = faqData.map((item, index) => `
    <div class="faq-item" data-index="${index}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
        <span>${item.question}</span>
        <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="faq-answer" id="faq-answer-${index}">
        ${item.answer}
      </div>
    </div>
  `).join('');

  // Add click handlers
  const items = container.querySelectorAll('.faq-item');
  items.forEach(item => {
    const button = item.querySelector('.faq-question') as HTMLButtonElement;

    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      items.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question') as HTMLButtonElement;
        btn?.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
