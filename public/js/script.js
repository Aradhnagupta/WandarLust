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

  
 //for when togler button clicked in navbar only then navbar expanded

    document.addEventListener("DOMContentLoaded", function () {
        let navbar = document.querySelector(".navbar"); // Navbar element
        let collapse = document.querySelector("#navbarNavAltMarkup"); // Collapsible menu
        let toggler = document.querySelector(".navbar-toggler"); // Toggler button

        // Function to adjust navbar height
        function adjustNavbarHeight() {
            if (collapse.classList.contains("show")) {
                navbar.style.height = "18rem"; // Set height immediately when expanded
            } else {
                navbar.style.height = ""; // Reset height when collapsed
            }
        }

        // Function to handle immediate height expansion
        function handleTogglerClick() {
            if (!collapse.classList.contains("show")) {
                navbar.style.height = "18rem"; // Set height before Bootstrap animates
            }
        }

        // Function to reset navbar and force collapse on resize
        function resetNavbarOnResize() {
            if (window.innerWidth >= 768) { // Bootstrap `sm` breakpoint
                navbar.style.height = ""; // Reset height when screen width increases
                collapse.classList.remove("show"); // Force collapse when resizing to large screens
            } else {
                navbar.style.height = ""; // Reset height when resizing back to small screens
                collapse.classList.remove("show"); // Ensure navbar is hidden on small screens
            }
        }

        // Listen for Bootstrap collapse events
        collapse.addEventListener("shown.bs.collapse", adjustNavbarHeight); // When expanded
        collapse.addEventListener("hidden.bs.collapse", adjustNavbarHeight); // When collapsed

        // Listen for toggler button click to set height instantly
        toggler.addEventListener("click", handleTogglerClick);

        // Listen for window resize
        window.addEventListener("resize", resetNavbarOnResize);
    });


  

   
   
   
  









