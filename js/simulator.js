document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('projectSimulator');
    const resultContent = document.querySelector('.result-content');
    const placeholder = document.querySelector('.result-placeholder');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const projectType = document.getElementById('projectType').value;
        const complexity = document.getElementById('complexity').value;
        const pages = parseInt(document.getElementById('pages').value);
        const deadline = parseInt(document.getElementById('deadline').value);
        const integrations = document.querySelectorAll('input[name="integrations"]:checked');
        
        // Validar campos
        if (!projectType || !complexity) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Calcular preço base
        let basePrice = 0;
        
        switch (projectType) {
            case 'web':
                basePrice = 5000;
                break;
            case 'mobile':
                basePrice = 8000;
                break;
            case 'desktop':
                basePrice = 10000;
                break;
            case 'ecommerce':
                basePrice = 12000;
                break;
            case 'testing':
                basePrice = 3000;
                break;
            case 'consulting':
                basePrice = 2500;
                break;
        }
        
        // Ajustar por complexidade
        switch (complexity) {
            case 'low':
                basePrice *= 0.8;
                break;
            case 'high':
                basePrice *= 1.5;
                break;
        }
        
        // Ajustar por páginas/funcionalidades
        basePrice += (pages - 5) * 500; // 5 é o valor padrão
        
        // Ajustar por integrações
        integrations.forEach(integration => {
            basePrice += 2000;
        });
        
        // Ajustar por prazo (urgência)
        if (deadline < 3) {
            basePrice *= 1.3; // 30% mais caro para prazos curtos
        }
        
        // Calcular prazo estimado
        let estimatedDeadline = 3; // meses base
        
        if (complexity === 'medium') estimatedDeadline = 4;
        if (complexity === 'high') estimatedDeadline = 6;
        
        estimatedDeadline += Math.ceil(pages / 10); // +1 mês a cada 10 páginas
        estimatedDeadline += integrations.length; // +1 mês por integração
        
        // Se o prazo desejado for menor que o estimado, ajustar preço
        if (deadline < estimatedDeadline) {
            const diff = estimatedDeadline - deadline;
            basePrice *= (1 + diff * 0.2); // 20% a mais por mês de antecipação
        }
        
        // Arredondar para milhar mais próximo
        basePrice = Math.round(basePrice / 1000) * 1000;
        
        // Exibir resultados
        document.getElementById('resultType').textContent = 
            document.querySelector(`#projectType option[value="${projectType}"]`).text;
        
        document.getElementById('resultComplexity').textContent = 
            document.querySelector(`#complexity option[value="${complexity}"]`).text.split(' (')[0];
        
        document.getElementById('resultDeadline').textContent = 
            `${estimatedDeadline} meses (${deadline < estimatedDeadline ? 'acelerado' : 'normal'})`;
        
        document.getElementById('resultPrice').textContent = 
            `R$ ${basePrice.toLocaleString('pt-BR')}`;
        
        // Mostrar resultados e esconder placeholder
        placeholder.style.display = 'none';
        resultContent.style.display = 'block';
    });
    
    // Resetar simulador
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Nova Simulação';
    resetBtn.className = 'btn btn-secondary';
    resetBtn.style.marginTop = '1rem';
    resetBtn.addEventListener('click', function() {
        form.reset();
        resultContent.style.display = 'none';
        placeholder.style.display = 'block';
    });
    
    document.querySelector('.result-actions').appendChild(resetBtn);
});