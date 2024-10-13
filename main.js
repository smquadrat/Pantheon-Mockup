// Chart.js initialization
function initializeCharts() {
    const revenueCtx = document.getElementById('revenueChart');
    const customerCtx = document.getElementById('customerChart');

    if (!revenueCtx || !customerCtx) {
        console.error('Cannot find chart canvas elements');
        return;
    }

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue ($M)',
            data: [8.5, 9.2, 10.1, 11.3, 11.9, 12.5],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };

    const customerData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'New Customers',
            data: [800, 950, 1100, 1150, 1200, 1250],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };

    const chartConfig = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    };

    new Chart(revenueCtx, {...chartConfig, data: revenueData});
    new Chart(customerCtx, {...chartConfig, data: customerData});
}

// AI Suggestion functionality
function initializeAISuggestions() {
    document.querySelectorAll('.ai-suggestion').forEach(item => {
        const originalText = item.textContent;
        const options = JSON.parse(item.dataset.options);
        
        item.innerHTML = `<span class="suggestion-text">${originalText}</span><i class="fas fa-lightbulb ml-1 text-yellow-400"></i>`;
        
        item.addEventListener('click', event => {
            const optionsDropdown = document.createElement('div');
            optionsDropdown.classList.add('ai-suggestion-options');
            
            options.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('ai-suggestion-option');
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => {
                    item.querySelector('.suggestion-text').textContent = option;
                    optionsDropdown.remove();
                });
                optionsDropdown.appendChild(optionElement);
            });
            
            item.appendChild(optionsDropdown);
            optionsDropdown.classList.add('show');
            
            document.addEventListener('click', function closeDropdown(e) {
                if (!item.contains(e.target)) {
                    optionsDropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    });
}

// Other functions remain unchanged

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeAISuggestions();
    initializeQuickActions();
    initializeAISidebar();
    initializeSmoothScroll();
    addLoadingAnimation();
});