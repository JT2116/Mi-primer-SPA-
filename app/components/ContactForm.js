export function ContactForm() {
    const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");
    
    $form.classList.add("contact-form");

    $styles.innerHTML = `
    .contact-form {
        --form-ok-color: #4caf50;
        --form-error-color: #f44336;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
      }
      
      .contact-form > * {
        padding: 0.5rem;
        margin: 1rem auto;
        display: block;
        width: 100%;
      }
      
      .contact-form textarea {
        resize: none;
      }
      
      .contact-form legend,
      .contact-form-response {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
      }
      
      .contact-form input,
      .contact-form textarea {
        font-size: 1rem;
        font-family: sans-serif;
      }
      
      .contact-form input[type="submit"] {
        width: 50%;
        font-weight: bold;
        cursor: pointer;
      }
      
      .contact-form *::placeholder {
        color: #000;
      }
      
      .contact-form [required]:valid {
        border: thin solid var(--form-ok-color);
      }
      
      .contact-form [required]:invalid {
        border: thin solid var(--form-error-color);
      }
      
      .contact-form-error {
        margin-top: -1rem;
        font-size: 80%;
        background-color: var(--form-error-color);
        color: #fff;
        transition: all 800ms ease;
      }
      
      .contact-form-error.is-active {
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both;
      }
      
      .none {
        display: none;
      }
      
      @keyframes show-message {
        0% {
          visibility: hidden;
          opacity: 0;
        }
      
        100% {
          visibility: visible;
          opacity: 1;
        }
      }
    `;

    $form.innerHTML = `<legend> Envianos tu comentarios </legend>

    <input type="text" name="name" placeholder="Escribe tu nombre"
    title="Nombre solo acepta letras y espacios en blanco" 
    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
    
    <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
    pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
    
    <input type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es requerido" required>
    
    <textarea name="comments" rows="5" placeholder="Escribe tus comentarios" 
    title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>
    
    <input type="submit" value="Enviar">
    
    <div class="contact-form-loader none">
        <img src="app/assets/loaders.svg" alt="Cargando">
    </div>
    
    <div class="contact-form-response none">
        <p>Los datos han sido enviados</p>
    </div>`;

    function contactFormValidations() {
        const form = document.querySelector(".contact-form"),
        input = document.querySelectorAll(".contact-form [required]");
    
        input.forEach((input) => {
            const span = document.createElement("span");
            span.id = input.name;
            span.textContent = input.title;
            span.classList.add("contact-form-error","none");
            input.insertAdjacentElement("afterend",span);
        });
    
        document.addEventListener("keyup",(e) => {
            if (e.target.matches(".contact-form [required]")) {
                let inputs = e.target,
                pattern = inputs.pattern || inputs.dataset.pattern;
    
                if (pattern && inputs.value !== "") {
                    let regex = new RegExp(pattern);
    
                    return !regex.exec(inputs.value)
                    ? document.getElementById(inputs.name).classList.add("is-active")
                    : document.getElementById(inputs.name).classList.remove("is-active");
                }
    
                if (!pattern) {
                    return inputs.value === ""
                    ? document.getElementById(inputs.name).classList.add("is-active")
                    : document.getElementById(inputs.name).classList.remove("is-active");
                }
                
            } 
        });
    
        document.addEventListener("submit",(e) => {
            e.preventDefault();
            alert("Enviado Formulario");
    
            const loader = document.querySelector(".contact-form-loader"),
            response = document.querySelector(".contact-form-response");
    
            loader.classList.remove("none");
    
            setTimeout(() =>{
                loader.classList.add("none");
                response.classList.remove("none");
                form.reset();
    
                setTimeout(() => response.classList.add("none"),3000);
            },3000);
        });
        
    }

    setTimeout(()=>contactFormValidations(),100);

    // contactFormValidations();

    return $form;
}