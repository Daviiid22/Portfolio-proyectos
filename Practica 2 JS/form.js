// En la página de Títulos, inicialmente aparecen ocultos. Al hacer clic en "verMas", se muestran.
function TitulosOcultos() {
  // Selecciona el elemento oculto y lo muestra
  let ocultos = document.getElementById('oculto');
  ocultos.style.display = ('block');

  // Oculta el botón "verMas"
  let VerMas = document.getElementById('verMas');
  VerMas.style.display = ('none');
}

// Función para validar el formulario
function formulario() {
  // Obtiene los valores de correo electrónico y nombre
  var email = document.getElementById("email").value;
  var nombre = document.getElementById("nombre").value;
  
  // Expresión regular para validar el formato del correo electrónico
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Muestra una alerta si el correo electrónico no es válido
    alert("Por favor, introduce una dirección de correo electrónico válida.");
  }
  
  // Verifica si el nombre contiene números
  var contieneNumeros = /\d/.test(nombre);
  if (contieneNumeros) {
    // Muestra una alerta si el nombre contiene números
    alert("El nombre no puede contener números.");
  }
}

// Carrusel de imágenes
function carrusel() {
  // Obtiene todas las imágenes del carrusel
  var slides = document.getElementsByClassName("Jude");
  var slideIndex = 0;

  // Función para mostrar las imágenes en el carrusel
  function mostrarImagen() {
    // Oculta todas las imágenes del carrusel
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.opacity = 0;
      slides[i].style.transition = "opacity 0.5s ease"; // Añade una transición de opacidad
    }

    // Muestra la imagen actual
    slides[slideIndex].style.opacity = 1;

    // Incrementa el índice para mostrar la siguiente imagen
    slideIndex = (slideIndex + 1) % slides.length;

    // Programa el cambio de imagen después de 2 segundos
    setTimeout(mostrarImagen, 2000);
  }

  // Inicia el carrusel
  mostrarImagen();
}

/*
function borrarStorage() {
  localStorage.clear();
}
*/

// Función para agregar comentarios a la sección de comentarios
function AgregarComentarios() {
  // Obtiene los valores del nombre y el comentario
  var nombre = document.getElementById("nombre2").value;
  var comentario = document.getElementById("comentario").value;

  // Verifica si ambos campos tienen valores
  if (nombre && comentario) {
    // Crea un nuevo elemento div para el comentario
    var commentSection = document.getElementById("comment-section");
    var commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = "<strong>" + nombre + ":</strong> " + comentario;
    // Agrega el comentario a la sección de comentarios
    commentSection.innerHTML += commentDiv.outerHTML;
  } else {
    // Muestra una alerta si uno de los campos está vacío
    alert("Por favor, completa ambos campos.");
  }
}
// Cambio de estilo de la pagina form.html
function estilos1() {
  var luna = document.getElementById('luna');
  luna.style.display = 'none';
  var sol = document.getElementById('sol');
  sol.style.display = 'block';

  document.body.classList.add("oscuro");


  var elemento = document.getElementById("titulo");
  elemento.style.color = "white";

}
function estilos2() {
  var luna = document.getElementById('luna');
  luna.style.display = 'block';
  var sol = document.getElementById('sol');
  sol.style.display = 'none';

  document.body.classList.remove("oscuro");


  var elemento = document.getElementById("titulo");
  elemento.style.color = "black";
}

// Cambiar estilos a la pagini inici.html
function estilos1Inici(){
  var luna = document.getElementById('luna');
  luna.style.display = 'none';
  var sol = document.getElementById('sol');
  sol.style.display = 'block';

  document.body.classList.add("oscuro");


  var elemento = document.getElementById('tituloh1');
  elemento.style.color = "white"

  var elemento2 = document.getElementsByTagName('h3');
  elemento2[0].style.color = "white"
  elemento2[1].style.color = "white"
  elemento2[2].style.color = "white"
}
function estilos2Inici(){
  var luna = document.getElementById('luna');
  luna.style.display = 'block';
  var sol = document.getElementById('sol');
  sol.style.display = 'none';

  document.body.classList.remove("oscuro");


  var elemento = document.getElementById('tituloh1');
  elemento.style.color = "rgb(78, 78, 167)"

  var elemento2 = document.getElementsByTagName('h3');
  elemento2[0].style.color = "rgb(78, 78, 167)"
  elemento2[1].style.color = "rgb(78, 78, 167)"
  elemento2[2].style.color = "rgb(78, 78, 167)"
}

// Cambiar estilos a la pagini Titulos.html
function estilos1Titulos(){
  var luna = document.getElementById('luna');
  luna.style.display = 'none';
  var sol = document.getElementById('sol');
  sol.style.display = 'block';

  document.body.classList.add("oscuro");


  var elemento = document.getElementById('palmares')
  elemento.style.color = 'white'
}
function estilos2Titulos(){
  var luna = document.getElementById('luna');
  luna.style.display = 'block';
  var sol = document.getElementById('sol');
  sol.style.display = 'none';

  document.body.classList.remove("oscuro");


  var elemento = document.getElementById('palmares')
  elemento.style.color = 'black'
}

// Cambiar estilos a la pagini Plantilla.html
function estilos1Plantilla(){
  var luna = document.getElementById('luna');
  luna.style.display = 'none';
  var sol = document.getElementById('sol');
  sol.style.display = 'block';

  document.body.classList.add("oscuro");


  var elemento = document.getElementById('plantilla')
  elemento.style.color = 'white'
  var elementosHR = document.getElementsByTagName('hr');
  for (var i = 0; i < elementosHR.length; i++) {
    elementosHR[i].style.borderColor = 'white';
  }
}
function estilos2Plantilla(){
  var luna = document.getElementById('luna');
  luna.style.display = 'block';
  var sol = document.getElementById('sol');
  sol.style.display = 'none';

  document.body.classList.remove("oscuro");


  var elemento = document.getElementById('plantilla')
  elemento.style.color = 'black'
  var elementosHR = document.getElementsByTagName('hr');
  for (var i = 0; i < elementosHR.length; i++) {
    elementosHR[i].style.borderColor = 'black';
  }
}