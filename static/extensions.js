const FormExtension = {
    name: 'ext_form', // Extension name
    type: 'response', // Extension type indicating it handles responses
    match: ({ trace }) => trace.payload.name === 'ext_form', // Condition for when this extension is triggered
    render: ({ trace, element }) => {
        // Function to render the form
        const formContainer = document.createElement('form'); // Create a form element dynamically
  
        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
       
      formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.8em;
          color: #888;
        }
        input[type="text"], input[type="email"], input[type="tel"] {
          width: 100%;
          border: none;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          margin: 5px 0;
          outline: none;
        }
        .phone {
          width: 150px;
        }
        .invalid {
          border-color: red;
        }
        .submit {
          background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
        }
      </style>
  
      <label for="name">Name</label>
      <input type="text" class="name" name="name" required><br><br>
  
      <label for="email">Email</label>
      <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Invalid email address"><br><br>
  
      <label for="phone">Phone Number</label>
      <input type="tel" class="phone" name="phone" required pattern="\\d+" title="Invalid phone number, please enter only numbers"><br><br>
  
      <input type="submit" class="submit" value="Submit">
    `
  
        // Attach an event listener to the form for handling the submit event
        formContainer.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission behavior
            // Extract values from the form fields
            const name = formContainer.querySelector('.name').value;
            const email = formContainer.querySelector('.email').value;
            const phone = formContainer.querySelector('.phone').value;
  
  
  
        if (
          !name.checkValidity() ||
          !email.checkValidity() ||
          !phone.checkValidity()
        ) {
          name.classList.add('invalid')
          email.classList.add('invalid')
          phone.classList.add('invalid')
          return
        }
        
            // Simplify the logic: Remove the submit button after submission without validation checks
            formContainer.querySelector('.submit').remove();
            // Programmatically submit the form data
            window.voiceflow.chat.interact({ type: 'complete', payload: { name, email, phone } });
        });
  
        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
  };
  
  window.FormExtension = FormExtension; // Make the FormExtension accessible globally
  