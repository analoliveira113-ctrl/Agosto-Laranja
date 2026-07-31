// ============================================================
//  QUIZ - AGOSTO LARANJA
//  Perguntas sobre Esclerose Múltipla e campanha
// ============================================================

(function() {
    'use strict';

    // ---- Dados do quiz ----
    const questions = [
        {
            question: "Qual é o símbolo do mês de conscientização sobre a Esclerose Múltipla?",
            options: ["Laço Laranja", "Laço Vermelho", "Laço Amarelo", "Laço Azul"],
            correct: 0
        },
        {
            question: "A Esclerose Múltipla afeta principalmente qual sistema do corpo?",
            options: ["Sistema digestivo", "Sistema nervoso central", "Sistema respiratório", "Sistema circulatório"],
            correct: 1
        },
        {
            question: "Qual é a cor oficial da campanha de conscientização sobre a Esclerose Múltipla?",
            options: ["Verde", "Laranja", "Roxo", "Rosa"],
            correct: 1
        },
        {
            question: "Agosto Laranja é um mês dedicado a:",
            options: ["Combate ao câncer", "Conscientização sobre EM", "Saúde mental", "Prevenção da diabetes"],
            correct: 1
        },
        {
            question: "Qual destes é um sintoma comum da Esclerose Múltipla?",
            options: ["Fadiga intensa", "Febre alta", "Dor de garganta", "Pressão alta"],
            correct: 0
        }
    ];

    // ---- Estado do quiz ----
    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    // ---- Elementos DOM ----
    const questionEl = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackEl = document.getElementById('feedback');
    const resetBtn = document.getElementById('resetQuizBtn');

    // ---- Função para renderizar uma pergunta ----
    function renderQuestion(index) {
        const q = questions[index];
        questionEl.textContent = q.question;
        optionsContainer.innerHTML = '';
        feedbackEl.textContent = '';
        answered = false;

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.dataset.optIndex = i;
            btn.addEventListener('click', function() {
                handleAnswer(i, this);
            });
            optionsContainer.appendChild(btn);
        });
    }

    // ---- Função para processar a resposta ----
    function handleAnswer(selectedIndex, btnElement) {
        if (answered) return;  // já respondeu esta pergunta

        const q = questions[currentQuestionIndex];
        const allBtns = optionsContainer.querySelectorAll('button');
        const isCorrect = (selectedIndex === q.correct);

        // Desabilita todos os botões
        allBtns.forEach(b => b.disabled = true);

        // Marca visualmente as respostas
        allBtns.forEach((b, idx) => {
            if (idx === q.correct) {
                b.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                b.classList.add('wrong');
            }
        });

        // Atualiza placar e feedback
        if (isCorrect) {
            score++;
            feedbackEl.textContent = '✅ Correto! +1 ponto.';
            feedbackEl.style.color = '#2e7d32';
        } else {
            feedbackEl.textContent = '❌ Resposta incorreta. A correta é: ' + q.options[q.correct];
            feedbackEl.style.color = '#b8430e';
        }
        answered = true;

        // Avança para a próxima pergunta após 1.8 segundos
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                renderQuestion(currentQuestionIndex);
            } else {
                // Fim do quiz
                questionEl.textContent = `🏁 Quiz finalizado! Você acertou ${score} de ${questions.length}.`;
                optionsContainer.innerHTML = '';
                feedbackEl.innerHTML = `🧡 <strong>Agosto Laranja</strong> — obrigado por participar!`;
                feedbackEl.style.color = '#b8430e';
            }
        }, 1800);
    }

    // ---- Função para resetar o quiz ----
    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        renderQuestion(0);
        feedbackEl.textContent = '🧡 Recomeçando o quiz...';
        feedbackEl.style.color = '#b8430e';
        setTimeout(() => {
            feedbackEl.textContent = '';
        }, 1000);
    }

    // ---- Inicialização ----
    renderQuestion(0);
    resetBtn.addEventListener('click', resetQuiz);

})();