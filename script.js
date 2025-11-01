// Variables globales
let currentUser = null;
let isLoggedIn = false;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función de inicialización
function initializeApp() {
    setupNavigation();
    setupForms();
    setupMobileMenu();
    checkLoginStatus();
    showSection('inicio'); // Mostrar la sección de inicio por defecto
}

// Configuración de navegación
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
                updateActiveNavLink(this);
            }
        });
    });
}

// Mostrar sección específica
function showSection(sectionName) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Actualizar el enlace activo en la navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });
    
    // Cerrar menú móvil si está abierto
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Actualizar enlace activo en navegación
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Configuración del menú móvil
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Configuración de formularios
function setupForms() {
    setupLoginForm();
    setupQuoteForm();
    setupContactForm();
    setupFAQ();
}

// Configuración del formulario de login
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Configurar pestañas de autenticación
    setupAuthTabs();
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
}

// Configurar pestañas de autenticación
function setupAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todas las pestañas
            authTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active a la pestaña seleccionada
            this.classList.add('active');
            document.getElementById(targetTab + '-form').classList.add('active');
        });
    });
}

// Manejar login
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validación básica
    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simular proceso de login
    showLoading(true);
    
    setTimeout(() => {
        // Simular login exitoso (en una aplicación real, esto sería una llamada al servidor)
        if (email === 'demo@insuramaweb.com' && password === 'demo123') {
            currentUser = {
                email: email,
                name: 'Usuario Demo',
                loginTime: new Date()
            };
            isLoggedIn = true;
            
            if (remember) {
                localStorage.setItem('rememberedUser', JSON.stringify(currentUser));
            }
            
            showNotification('¡Bienvenido! Has iniciado sesión correctamente', 'success');
            updateLoginStatus();
            showSection('inicio');
        } else {
            showNotification('Credenciales incorrectas. Usa: demo@insuramaweb.com / demo123', 'error');
        }
        
        showLoading(false);
    }, 1500);
}

// Manejar registro
function handleRegister() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Validaciones
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (!acceptTerms) {
        showNotification('Debes aceptar los términos y condiciones', 'error');
        return;
    }
    
    // Simular proceso de registro
    showLoading(true);
    
    setTimeout(() => {
        // Simular registro exitoso
        const newUser = {
            email: email,
            name: `${firstName} ${lastName}`,
            phone: phone,
            registrationTime: new Date()
        };
        
        // Guardar usuario registrado (en una aplicación real, esto sería una llamada al servidor)
        localStorage.setItem('registeredUsers', JSON.stringify([newUser]));
        
        // Iniciar sesión automáticamente
        currentUser = newUser;
        isLoggedIn = true;
        localStorage.setItem('rememberedUser', JSON.stringify(currentUser));
        
        showNotification(`¡Bienvenido ${firstName}! Tu cuenta ha sido creada exitosamente`, 'success');
        updateLoginStatus();
        showSection('inicio');
        
        // Limpiar formulario
        document.getElementById('registerForm').reset();
        
        showLoading(false);
    }, 2000);
}

// Verificar estado de login
function checkLoginStatus() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        currentUser = JSON.parse(rememberedUser);
        isLoggedIn = true;
        updateLoginStatus();
    }
}

// Actualizar estado de login en la UI
function updateLoginStatus() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        if (isLoggedIn) {
            loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${currentUser.name}`;
            loginBtn.onclick = logout;
        } else {
            loginBtn.innerHTML = '<i class="fas fa-user"></i> Login';
            loginBtn.onclick = () => showSection('login');
        }
    }
}

// Cerrar sesión
function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('rememberedUser');
    updateLoginStatus();
    showNotification('Has cerrado sesión correctamente', 'info');
    showSection('inicio');
}

// Configuración del formulario de cotización
function setupQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuoteSubmission();
        });
        
        // Agregar listener para calcular cotización en tiempo real
        const valorDispositivo = document.getElementById('valorDispositivo');
        const tipoDispositivo = document.getElementById('tipoDispositivo');
        const cobertura = document.getElementById('cobertura');
        const periodRadios = document.querySelectorAll('input[name="periodo"]');
        
        if (valorDispositivo && tipoDispositivo && cobertura) {
            [valorDispositivo, tipoDispositivo, cobertura].forEach(element => {
                element.addEventListener('change', updateQuotePreview);
                element.addEventListener('input', updateQuotePreview);
            });
        }

        if (periodRadios && periodRadios.length) {
            periodRadios.forEach(radio => {
                radio.addEventListener('change', updateQuotePreview);
            });
        }
    }
}

// Actualizar vista previa de cotización
function updateQuotePreview() {
    const valorDispositivo = document.getElementById('valorDispositivo').value;
    const tipoDispositivo = document.getElementById('tipoDispositivo').value;
    const cobertura = document.getElementById('cobertura').value;
    const periodoSeleccionado = document.querySelector('input[name="periodo"]:checked')?.value || 'mensual';
    
    if (valorDispositivo && tipoDispositivo && cobertura) {
        const cotizacion = calculateQuote(valorDispositivo, tipoDispositivo, cobertura);
        cotizacion.periodoSeleccionado = periodoSeleccionado;
        showQuotePreview(cotizacion);
    }
}

// Calcular cotización exacta
function calculateQuote(valor, tipoDispositivo, cobertura) {
    const valorNumerico = parseFloat(valor);
    
    // Factores base por tipo de dispositivo
    const factoresDispositivo = {
        'celular': 0.08,        // 8% del valor
        'laptop': 0.06,         // 6% del valor
        'tablet': 0.07,         // 7% del valor
        'smartwatch': 0.09,     // 9% del valor
        'auriculares': 0.12,    // 12% del valor
        'camara': 0.05,         // 5% del valor
        'consola': 0.06,        // 6% del valor
        'otros': 0.08           // 8% del valor
    };
    
    // Multiplicadores por tipo de cobertura
    const multiplicadoresCobertura = {
        'basica': 1.0,          // Precio base
        'completa': 1.5,        // 50% más
        'premium': 2.0          // 100% más
    };
    
    // Calcular precio base
    const factorBase = factoresDispositivo[tipoDispositivo] || 0.08;
    const multiplicador = multiplicadoresCobertura[cobertura] || 1.0;
    
    const precioMensual = (valorNumerico * factorBase * multiplicador) / 12;
    const precioAnual = valorNumerico * factorBase * multiplicador;
    
    // Descuentos por valor del dispositivo
    let descuento = 0;
    if (valorNumerico >= 2000) descuento = 0.15; // 15% descuento
    else if (valorNumerico >= 1000) descuento = 0.10; // 10% descuento
    else if (valorNumerico >= 500) descuento = 0.05; // 5% descuento
    
    const precioMensualFinal = precioMensual * (1 - descuento);
    const precioAnualFinal = precioAnual * (1 - descuento);
    
    return {
        valorDispositivo: valorNumerico,
        tipoDispositivo: tipoDispositivo,
        cobertura: cobertura,
        precioMensual: precioMensualFinal,
        precioAnual: precioAnualFinal,
        descuento: descuento,
        ahorroAnual: (precioMensualFinal * 12) - precioAnualFinal
    };
}

// Mostrar vista previa de cotización
function showQuotePreview(cotizacion) {
    // Crear o actualizar el elemento de vista previa
    let previewElement = document.getElementById('quote-preview');
    
    if (!previewElement) {
        previewElement = document.createElement('div');
        previewElement.id = 'quote-preview';
        previewElement.className = 'quote-preview';
        
        const quoteForm = document.getElementById('quoteForm');
        const submitButton = quoteForm.querySelector('button[type="submit"]');
        quoteForm.insertBefore(previewElement, submitButton);
    }
    
    const tipoDispositivo = getTipoDispositivoText(cotizacion.tipoDispositivo);
    const tipoCobertura = getTipoCoberturaText(cotizacion.cobertura);
    
    const selectedPeriod = cotizacion.periodoSeleccionado || 'anual';
    previewElement.innerHTML = `
        <div class="quote-preview-content">
            <h4><i class="fas fa-calculator"></i> Vista Previa de tu Cotización</h4>
            <div class="quote-details">
                <div class="quote-item">
                    <span class="label">Dispositivo:</span>
                    <span class="value">${tipoDispositivo}</span>
                </div>
                <div class="quote-item">
                    <span class="label">Valor del dispositivo:</span>
                    <span class="value">$${cotizacion.valorDispositivo.toLocaleString()}</span>
                </div>
                <div class="quote-item">
                    <span class="label">Tipo de cobertura:</span>
                    <span class="value">${tipoCobertura}</span>
                </div>
                ${cotizacion.descuento > 0 ? `
                <div class="quote-item discount">
                    <span class="label">Descuento aplicado:</span>
                    <span class="value">${(cotizacion.descuento * 100).toFixed(0)}%</span>
                </div>
                ` : ''}
            </div>
            <div class="quote-pricing">
                <div class="price-option ${selectedPeriod==='mensual' ? 'selected' : ''}" data-period="mensual">
                    <div class="price-label">Pago Mensual</div>
                    <div class="price-value">$${cotizacion.precioMensual.toFixed(2)}/mes</div>
                </div>
                <div class="price-option recommended ${selectedPeriod==='anual' ? 'selected' : ''}" data-period="anual">
                    <div class="price-label">Pago Anual <span class="badge">Recomendado</span></div>
                    <div class="price-value">$${cotizacion.precioAnual.toFixed(2)}/año</div>
                    ${cotizacion.ahorroAnual > 0 ? `
                    <div class="savings">Ahorras $${cotizacion.ahorroAnual.toFixed(2)}</div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Permitir seleccionar el periodo desde la vista previa
    previewElement.querySelectorAll('.price-option').forEach(option => {
        option.addEventListener('click', () => {
            const period = option.dataset.period;
            const radio = document.getElementById(period === 'mensual' ? 'periodoMensual' : 'periodoAnual');
            if (radio) {
                radio.checked = true;
            }
            cotizacion.periodoSeleccionado = period;
            showQuotePreview(cotizacion);
        });
    });
}

// Funciones auxiliares para obtener texto legible
function getTipoDispositivoText(tipo) {
    const tipos = {
        'celular': 'Celular / Smartphone',
        'laptop': 'Laptop / Computadora Portátil',
        'tablet': 'Tablet / iPad',
        'smartwatch': 'Smartwatch / Reloj Inteligente',
        'auriculares': 'Auriculares / AirPods',
        'camara': 'Cámara Digital',
        'consola': 'Consola de Videojuegos',
        'otros': 'Otros Dispositivos'
    };
    return tipos[tipo] || tipo;
}

function getTipoCoberturaText(tipo) {
    const tipos = {
        'basica': 'Básica (Robo y Daños)',
        'completa': 'Completa (Todo Riesgo)',
        'premium': 'Premium (Cobertura Total + Extras)'
    };
    return tipos[tipo] || tipo;
}

// Manejar envío de cotización
function handleQuoteSubmission() {
    const formData = new FormData(document.getElementById('quoteForm'));
    const data = Object.fromEntries(formData);
    
    // Validación
    if (!data.tipoDispositivo || !data.marca || !data.modelo || !data.valorDispositivo || 
        !data.nombre || !data.email || !data.telefono || !data.cobertura) {
        showNotification('Por favor, completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    if (parseFloat(data.valorDispositivo) < 50 || parseFloat(data.valorDispositivo) > 10000) {
        showNotification('El valor del dispositivo debe estar entre $50 y $10,000', 'error');
        return;
    }
    
    showLoading(true);
    
    // Calcular cotización final
    const cotizacion = calculateQuote(data.valorDispositivo, data.tipoDispositivo, data.cobertura);
    const periodoSeleccionado = data.periodo || 'anual';
    cotizacion.periodoSeleccionado = periodoSeleccionado;
    
    setTimeout(() => {
        showQuoteResult(data, cotizacion);
        showLoading(false);
    }, 2000);
}

// Mostrar resultado final de cotización
function showQuoteResult(formData, cotizacion) {
    const tipoDispositivo = getTipoDispositivoText(formData.tipoDispositivo);
    const tipoCobertura = getTipoCoberturaText(formData.cobertura);
    const planSeleccionado = cotizacion.periodoSeleccionado === 'mensual' ? 'Pago Mensual' : 'Pago Anual';
    const precioSeleccionado = cotizacion.periodoSeleccionado === 'mensual' 
        ? `$${cotizacion.precioMensual.toFixed(2)}/mes` 
        : `$${cotizacion.precioAnual.toFixed(2)}/año`;
    
    // Construir panel de resultado inline
    const resultPanelHTML = `
        <div class="quote-success">
            <div class="quote-success-header">
                <i class="fas fa-check-circle"></i>
                <span>¡Cotización exitosa!</span>
            </div>
            <div class="quote-result">
                <h4>Resumen de tu Cotización</h4>
                <div class="customer-info">
                    <p><strong>Cliente:</strong> ${formData.nombre}</p>
                    <p><strong>Dispositivo:</strong> ${formData.marca} ${formData.modelo}</p>
                    <p><strong>Tipo:</strong> ${tipoDispositivo}</p>
                    <p><strong>Cobertura:</strong> ${tipoCobertura}</p>
                    <p><strong>Periodo Seleccionado:</strong> ${planSeleccionado}</p>
                </div>
                <div class="final-pricing">
                    <div class="price-row selected">
                        <span>${planSeleccionado}:</span>
                        <span class="price">${precioSeleccionado}</span>
                    </div>
                </div>
                <p class="contact-info">Te contactaremos al ${formData.telefono} y ${formData.email} para finalizar tu póliza.</p>
                <div class="quote-actions">
                    <button class="btn btn-secondary" id="newQuoteBtn"><i class="fas fa-redo"></i> Nueva cotización</button>
                </div>
            </div>
        </div>
    `;

    const quoteForm = document.getElementById('quoteForm');
    const quoteContainer = document.querySelector('#cotizaciones .quote-form-container');

    // Limpiar vista previa y ocultar formulario
    const previewElement = document.getElementById('quote-preview');
    if (previewElement) previewElement.remove();
    quoteForm.style.display = 'none';

    // Insertar panel de éxito
    let successPanel = document.getElementById('quote-success-panel');
    if (!successPanel) {
        successPanel = document.createElement('div');
        successPanel.id = 'quote-success-panel';
        successPanel.className = 'quote-success-panel';
        quoteContainer.appendChild(successPanel);
    }
    successPanel.innerHTML = resultPanelHTML;

    // Acción de nueva cotización
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            document.getElementById('quoteForm').reset();
            successPanel.remove();
            quoteForm.style.display = '';
            // restaurar selección por defecto
            const defaultPeriod = document.getElementById('periodoMensual');
            if (defaultPeriod) defaultPeriod.checked = true;
            updateQuotePreview();
        });
    }
}

// Configuración del formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission();
        });
    }
}

// Manejar envío de contacto
function handleContactSubmission() {
    const formData = new FormData(document.getElementById('contactForm'));
    const data = Object.fromEntries(formData);
    
    // Validación
    if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
        document.getElementById('contactForm').reset();
        showLoading(false);
    }, 2000);
}

// Configuración de FAQ
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

// Toggle FAQ
function toggleFAQ(questionElement) {
    const faqItem = questionElement.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = questionElement.querySelector('i');
    
    // Cerrar otras FAQ abiertas
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            otherAnswer.classList.remove('active');
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle FAQ actual
    answer.classList.toggle('active');
    
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Funciones de utilidad
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoading(show) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (show) {
            form.classList.add('loading');
        } else {
            form.classList.remove('loading');
        }
    });
}

function showNotification(message, type = 'info', duration = 5000) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 500px;
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                animation: slideIn 0.3s ease-out;
                backdrop-filter: blur(10px);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
            }
            
            .notification-info {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: white;
            }
            
            .notification-warning {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
            }
            
            .notification-message {
                flex: 1;
                line-height: 1.5;
            }
            
            .notification-message h4 {
                margin: 0 0 10px 0;
                font-size: 1.1rem;
            }
            
            .notification-message p {
                margin: 5px 0;
                font-size: 0.9rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                opacity: 0.8;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                opacity: 1;
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después del tiempo especificado
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                closeNotification(notification.querySelector('.notification-close'));
            }
        }, duration);
    }
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// Funciones específicas para asistencia
function openChat() {
    // Crear overlay de chatbot si no existe
    let overlay = document.getElementById('chatbotOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'chatbotOverlay';
        overlay.className = 'chatbot-overlay';
        overlay.innerHTML = `
            <div class="chatbot-window">
                <div class="chat-header">
                    <div class="chat-title"><i class="fas fa-robot"></i> Asistente Insurama</div>
                    <button class="chat-close" id="chatCloseBtn"><i class="fas fa-times"></i></button>
                </div>
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input">
                    <input type="text" id="chatInputField" placeholder="Escribe tu mensaje..." />
                    <button id="chatSendBtn" class="btn btn-primary"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>`;
        document.body.appendChild(overlay);

        // Eventos
        document.getElementById('chatCloseBtn').addEventListener('click', () => {
            overlay.classList.remove('visible');
        });
        document.getElementById('chatSendBtn').addEventListener('click', sendChatMessage);
        document.getElementById('chatInputField').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    // Mostrar overlay y mensaje de bienvenida
    overlay.classList.add('visible');
    const messages = document.getElementById('chatMessages');
    messages.innerHTML = '';
    addBotMessage('Hola 👋 Soy tu asistente virtual de Insurama. ¿Cómo puedo ayudarte hoy?');
    addBotMessage('Puedes preguntar sobre cotizaciones, coberturas, reclamos o soporte 24/7.');
}

function sendChatMessage() {
    const input = document.getElementById('chatInputField');
    const text = (input.value || '').trim();
    if (!text) return;
    addUserMessage(text);
    input.value = '';
    setTimeout(() => {
        addBotMessage(getBotResponse(text));
    }, 500);
}

function addUserMessage(text) {
    const messages = document.getElementById('chatMessages');
    const el = document.createElement('div');
    el.className = 'chat-message user';
    el.innerText = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
}

function addBotMessage(text) {
    const messages = document.getElementById('chatMessages');
    const el = document.createElement('div');
    el.className = 'chat-message bot';
    el.innerText = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(text) {
    const t = text.toLowerCase();
    if (t.includes('cotiz') || t.includes('precio') || t.includes('plan')) {
        return 'Para cotizar, ve a "Cotiza tu Dispositivo" y completa el formulario. Si ya lo hiciste, revisa el panel de resumen con tu precio exacto.';
    }
    if (t.includes('cobertura') || t.includes('seguro')) {
        return 'Ofrecemos coberturas Básica, Completa y Premium. La Premium incluye reemplazo y cobertura total.';
    }
    if (t.includes('reclamo') || t.includes('siniestro')) {
        return 'Puedes reportar un siniestro desde el Centro de Asistencia o llamando al 01-800-SEGUROS. Si estás logueado, te acompaño en el proceso.';
    }
    if (t.includes('soporte') || t.includes('ayuda') || t.includes('contacto')) {
        return 'Nuestro soporte es 24/7 por chat y teléfono. ¿Deseas que te contacten por correo?';
    }
    return 'Gracias por tu mensaje. Estoy aquí para ayudarte con cotizaciones, coberturas y asistencia. ¿Qué necesitas?';
}

function reportClaim() {
    if (!isLoggedIn) {
        showNotification('Debes iniciar sesión para reportar un siniestro', 'warning');
        showSection('login');
        return;
    }
    
    showNotification('Función de reporte de siniestros en desarrollo. Por favor, llama a nuestra línea de emergencia.', 'info');
}

// Funciones adicionales para mejorar la experiencia
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón de scroll to top
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'scroll-to-top';
    button.onclick = scrollToTop;
    
    // Estilos para el botón
    const styles = document.createElement('style');
    styles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: var(--shadow);
            transition: var(--transition);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
        }
    `;
    
    if (!document.querySelector('#scroll-styles')) {
        styles.id = 'scroll-styles';
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

// Inicializar funciones adicionales
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTopButton();
});

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showNotification('Ha ocurrido un error inesperado. Por favor, recarga la página.', 'error');
});

// Funciones para demo y testing
function fillDemoLogin() {
    document.getElementById('email').value = 'demo@insuramaweb.com';
    document.getElementById('password').value = 'demo123';
}

// Agregar evento para llenar datos demo (doble clic en el logo)
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('dblclick', function() {
            if (document.getElementById('login').classList.contains('active')) {
                fillDemoLogin();
                showNotification('Datos demo cargados. Email: demo@insuramaweb.com, Password: demo123', 'info');
            }
        });
    }
});

// Exportar funciones para uso global
window.showSection = showSection;
window.toggleFAQ = toggleFAQ;
window.openChat = openChat;
window.reportClaim = reportClaim;