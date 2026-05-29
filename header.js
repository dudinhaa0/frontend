document.addEventListener('DOMContentLoaded', () => {
    // Código original do menu burger
    let menuBurger = document.querySelector('.menu-burger');
    let headerMenu = document.querySelector('.header-menu');

    if (menuBurger && headerMenu) {
        menuBurger.addEventListener('click', () => {
            if (headerMenu.style.display === 'block') {
                headerMenu.style.display = 'none';
                menuBurger.classList.remove('active');
            } else {
                headerMenu.style.display = 'block';
                menuBurger.classList.add('active');
            }
        });
    }

    // INTERCEÇÃO DOS INPUTS DE PESQUISA (.search)
    const inputsPesquisa = document.querySelectorAll('.search');
    inputsPesquisa.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                window.location.href = `produtos.html?search=${encodeURIComponent(input.value.trim())}`;
            }
        });
    });
});