$(function () {

  var SendButton = document.querySelector('.ladda-button');
  SendButton.addEventListener("click", function (event) {
    event.preventDefault();
    // console.log($("#contactForm").valid())

    $("#contactForm").validate({
      rules: {
        firstname: "required",
        lastname: "required",
        company: "required",
        email: "required"
      },
      messages: {
        firstname: "Please enter Firstname.",
        lastname: "Please enter Lastname.",
        company: "Please enter your company.",
        email: "Please enter your Email.",
      },
      errorPlacement: function (error, element) { }
    });

    if ($("#contactForm").valid() == false) {
      $("#contactForm").valid();
      return false
    }
   


    var SendButtonObj = Ladda.create(document.querySelector('.ladda-button'));

    // Start loading
    SendButtonObj.start();

    SendButtonObj.isLoading();


    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;
    var company = document.getElementById("company").value;
    var inquiry = document.getElementById("select-1").value;
    var message = document.getElementById("form-text").value;
    var email = document.getElementById("email").value;



    var data = JSON.stringify({
      "firstname": firstname,
      "lastname": lastname,
      "company": company,
      "inquiry": inquiry,
      "message": (message != "") ? message : "",
      "email": email
    });
   
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        SendButtonObj.stop();
        var response = JSON.parse(this.responseText)

        if (response[0].status) {

          SendButton.innerHTML = "Thank you, we will contact you shortly"
          // alert("Thank you, we will contact you shortly")
        } else {
          SendButton.innerHTML = "Sorry an error occurred"
          // alert("Sorry an error occurred")
        }
     
        document.getElementById("contactForm").reset();



      }
    });

    xhr.open("POST", "https://hrf0u1oorb.execute-api.ap-southeast-2.amazonaws.com/development/contact/contactus");
    xhr.setRequestHeader("content-type", "application/json");


    xhr.send(data);


  });
}) 