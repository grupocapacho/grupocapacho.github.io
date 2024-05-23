document.addEventListener('DOMContentLoaded', function() {
  //Evitar menu contextual
  $(document).on("contextmenu", function (event) { event.preventDefault(); });
  $(document).on('contextmenu','input', e => {
    new ContextMenu();
    return false;
  });
  $(".button-collapse").sideNav();
});

//Separar números
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

//Copiar contenido al portapapeles
function copyToClipboard(elementId) {

  // Create an auxiliary hidden input
  var aux = document.createElement("input");

  // Get the text from the element passed into the input
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);

  // Append the aux input to the body
  document.body.appendChild(aux);

  // Highlight the content
  aux.select();

  // Execute the copy command
  document.execCommand("copy");

  // Remove the input from the body
  document.body.removeChild(aux);

  Materialize.toast('Valor copiado al portapapeles', 4000);
};