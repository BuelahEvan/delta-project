// Example starter JavaScript for disabling form submissions if there are invalid fields 
//   //this code is copied from bootstrap for class="needs-validation"  
//we can keep this code in new.ejs or boilerplate.ejs but keeping in this js folder script.js file
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()