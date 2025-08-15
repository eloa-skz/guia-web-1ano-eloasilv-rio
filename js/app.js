// Dados das tecnologias
const technologiesData = [
    {
        id: 1,
        name: "React",
        category: "Front-end",
        description: "Biblioteca JavaScript para construção de interfaces de usuário",
        pros: ["Componentes reutilizáveis", "Grande ecossistema"],
        cons: ["Curva de aprendizado", "Bundle size inicial"],
        level: "Intermediário"
    },
    {
        id: 2,
        name: "Node.js",
        category: "Back-end",
        description: "Runtime JavaScript para servidor baseado no motor V8",
        pros: ["Mesma linguagem no front e back", "NPM (grande repositório de pacotes)"],
        cons: ["Callback hell", "Performance em CPU-bound"],
        level: "Intermediário"
    },
    {
        id: 3,
        name: "PostgreSQL",
        category: "Database",
        description: "Sistema de gerenciamento de banco de dados relacional",
        pros: ["Robusto e confiável", "Suporte a JSON"],
        cons: ["Configuração inicial", "Consumo de recursos"],
        level: "Intermediário"
    },
    {
        id: 4,
        name: "Docker",
        category: "DevOps",
        description: "Plataforma para desenvolvimento e implantação de containers",
        pros: ["Ambiente consistente", "Fácil escalabilidade"],
        cons: ["Complexidade inicial", "Overhead de recursos"],
        level: "Avançado"
    },
    {
        id: 5,
        name: "Jest",
        category: "Testing",
        description: "Framework de teste JavaScript com foco em simplicidade",
        pros: ["Fácil de configurar", "Snapshots"],
        cons: ["Velocidade em grandes suites", "Mocks complexos"],
        level: "Iniciante"
    },
    {
        id: 6,
        name: "Vue.js",
        category: "Front-end",
        description: "Framework progressivo para construção de UIs",
        pros: ["Fácil de aprender", "Documentação excelente"],
        cons: ["Menos vagas no mercado", "Ecossistema menor"],
        level: "Iniciante"
    },
    {
        id: 7,
        name: "Django",
        category: "Back-end",
        description: "Framework web Python de alto nível",
        pros: ["Admin interface pronta", "ORM poderoso"],
        cons: ["Monolítico", "Muito opinativo"],
        level: "Intermediário"
    },
    {
        id: 8,
        name: "MongoDB",
        category: "Database",
        description: "Banco de dados NoSQL orientado a documentos",
        pros: ["Flexibilidade de schema", "Escalabilidade horizontal"],
        cons: ["Consistência eventual", "Uso de memória"],
        level: "Iniciante"
    },
    {
        id: 9,
        name: "TypeScript",
        category: "Front-end",
        description: "Superset tipado do JavaScript",
        pros: ["Type safety", "Melhor IDE support"],
        cons: ["Configuração inicial", "Build step adicional"],
        level: "Intermediário"
    },
    {
        id: 10,
        name: "Kubernetes",
        category: "DevOps",
        description: "Sistema de orquestração de containers",
        pros: ["Automação poderosa", "Alta disponibilidade"],
        cons: ["Complexidade alta", "Curva de aprendizado íngreme"],
        level: "Avançado"
    },
    {
        id: 11,
        name: "Cypress",
        category: "Testing",
        description: "Framework moderno para testes end-to-end",
        pros: ["Interface visual", "API intuitiva"],
        cons: ["Apenas Chromium", "Testes paralelos pagos"],
        level: "Intermediário"
    },
    {
        id: 12,
        name: "Express",
        category: "Back-end",
        description: "Framework web minimalista para Node.js",
        pros: ["Simples e flexível", "Grande comunidade"],
        cons: ["Muito manual", "Middleware hell"],
        level: "Iniciante"
    }
];

// Menu responsivo
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const nav = document.querySelector('nav');

    if (hamburgerBtn && nav) {
        hamburgerBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    // Fecha o menu ao clicar em um link (em mobile)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('nav-open');
            }
        });
    });

    // Toggle de tema (implementação básica)
    const themeToggleBtn = document.getElementById('theme-toggle-button');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            // Aqui você pode adicionar mais lógica para persistir a preferência do usuário
        });
    }

    // Lógica específica para a página de tecnologias
    if (window.location.pathname.includes('tecnologias.html')) {
        initTechnologiesPage();
    }
});

// Função para inicializar a página de tecnologias
function initTechnologiesPage() {
    const techGrid = document.getElementById('tech-grid');
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.querySelectorAll('.category-filter');

    // Renderiza os cards iniciais
    renderTechCards(technologiesData);

    // Adiciona eventos de filtro
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredTech = technologiesData.filter(tech => 
                tech.name.toLowerCase().includes(searchTerm) ||
                tech.description.toLowerCase().includes(searchTerm)
            );
            renderTechCards(filteredTech);
        });
    }

    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Remove classe ativa de todos os botões
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona classe ativa ao botão clicado
                button.classList.add('active');

                const filteredTech = category === 'Todos' 
                    ? technologiesData 
                    : technologiesData.filter(tech => tech.category === category);
                
                renderTechCards(filteredTech);
                
                // Salva a categoria selecionada
                localStorage.setItem('selectedCategory', category);
            });
        });
    }

    // Carrega a categoria salva
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
        const categoryButton = document.querySelector(`[data-category="${savedCategory}"]`);
        if (categoryButton) {
            categoryButton.click();
        }
    }
}

// Função para renderizar os cards de tecnologia
function renderTechCards(techArray) {
    const techGrid = document.getElementById('tech-grid');
    if (!techGrid) return;

    techGrid.innerHTML = '';

    techArray.forEach(tech => {
        const card = document.createElement('article');
        card.className = 'tech-card';
        card.dataset.id = tech.id;

        card.innerHTML = `
            <h3>${tech.name}</h3>
            <span class="category-tag">${tech.category}</span>
            <p class="description">${tech.description}</p>
            <div class="tech-details">
                <p class="level">Nível: ${tech.level}</p>
                <div class="pros-cons">
                    <div class="pros">
                        <h4>Prós:</h4>
                        <ul>
                            ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons">
                        <h4>Contras:</h4>
                        <ul>
                            ${tech.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        techGrid.appendChild(card);
    });
}
