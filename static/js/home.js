// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
            else{
                event.preventDefault()
                document.getElementById("name").disabled = true;
                document.getElementById("email").disabled = true;
                document.getElementById("amount").disabled = true;
                document.getElementById("submit").disabled = true;
                document.getElementById('paypal-button-container').hidden = false;
            }
            form.classList.add('was-validated')
        }, false)
        })
    })()



// Render the PayPal button into #paypal-button-container
paypal.Buttons({

    // Set up the transaction
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('amount').value
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            showAlertBox();
            document.getElementById("name").disabled = false;
            document.getElementById("email").disabled = false;
            document.getElementById("amount").disabled = false;
            document.getElementById("submit").disabled = false;
            document.getElementById('paypal-button-container').hidden = true;
            submitFormData();
        });
    },

    style: {
        color:  'gold',
        shape:  'pill',
        label:  'pay',
        height: 40
    }


}).render('#paypal-button-container');


const alertBox=document.querySelector(".alert-box");
const closeBtn=document.querySelector(".close-alert")     
let timer;

        
closeBtn.addEventListener("click",function () {
    hideAlertBox();
    clearTimeout(timer);
})

function showAlertBox(){
alertBox.classList.remove("hide");
alertBox.classList.add("show");
// hide animation onload 
if(alertBox.classList.contains("hidden")){
    alertBox.classList.remove("hidden");
}
timer=setTimeout(function(){
    hideAlertBox();
},5000)
}

function hideAlertBox(){
alertBox.classList.remove("show");
alertBox.classList.add("hide");
}

function submitFormData(){
    console.log('Payment Submitted');

    let userFormData = {
        'name' : document.getElementById("name").value,
        'email': document.getElementById("email").value,
        'amount' : document.getElementById("amount").value,
    };

    let url = '/send-mail/';
    let form = document.getElementById('donate-form');
    let csrftoken = form.getElementsByTagName("input")[0].value;
    fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            'form': userFormData,
        })
    }).then( response => console.log(response));

}