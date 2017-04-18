
/*global, console $*/

$(document).ready(function() {
  "use strict";

  var fm,
    fn,
    ln,
    fb,
    err,
    dt,
    data,
    xhr,
    em,
    msg,
    sb,
    contents,
    url,
    i;


  contents = {};




// handle ajax request
function handleAjax() {

    "use strict";

    fb.innerHTML = xhr.responseText;
}


function validateForm(ev) {

    "use strict";

    // prevent form from submitting
    ev.preventDefault();

    fm = document.querySelector("form");
    fn = document.querySelector("#first-name");
    ln = document.querySelector("#last-name");
    em = document.querySelector("#e-mail");
    msg = document.querySelector("#message");
    sb = document.querySelector("#subject");
    fb = document.querySelector(".feedback");


    // start with empty buckets
    err = [];
    dt = {};
    fb.innerHTML = "";


    // evaluate first name
    if (fn.value !== "") {
        dt.first_name = fn.value;
    } else {
        err.push("<p>First name?</p>");
    }

    // evaluate last name
    if (ln.value !== "") {
        dt.last_name = ln.value;
    } else {
        err.push("<p>Last name?</p>");
    }

    //evaluate email
    if (em.value !== "") {
        dt.email = em.value;

    } else {
      err.push("<p>email?</p>")
    }

    if (msg.value !== "") {
      dt.messagebox = msg.value;
    } else {
      err.push("<p>Any message?</p>")
    }

    if (sb.value !== "") {
      dt.subjectline = sb.value;
    } else {
      err.push ("<p>Subject?</p>")
    }
    // create feedback
    if (err.length === 0) {

        // pack the user input into query string
        data = "fname=" + dt.first_name + "&lname=" + dt.last_name + "&email=" + dt.email + "&subject=" + dt.subjectline + "&message=" + dt.messagebox;

        if (data) {

            // Make a new instance of XMLHttpRequest object:
            xhr = new XMLHttpRequest();

            // time to handle your AJAX request
            xhr.open("post", "./server-side-script/web-service.php", true);

            // let web server know what kinf of data is coming ...
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            // register handleAjax to listen for load event triggered by xhr object
            xhr.addEventListener("load", handleAjax, false);

            // send request and data
            xhr.send(data);
        }

    } else {

        // loop through errors
        for (i = 0; i < err.length; i += 1) {
            // append errors to feedback div
            fb.innerHTML += err[i];
        }
    }
}


  //use load method to load the home.html into index.html

  $(".bg-main .box").load("./partials/home.html", function (rsp) {
      contents["./partials/home.html"] = rsp;

  });

  function loadContents(urlParam) {
      if (contents[urlParam]) {
        //load content from Pages
        $(".bg-main .box").html(contents[urlParam]);
      } else {
        //load content from ajax request
        $(".bg-main .box").load(urlParam, function (rsp) {
          contents[urlParam] = rsp;
          console.log("Loaded by ajax request!")
        });
      }
    }


  //handle navbar links on click event
  $("a").on("click", function (ev) {
    ev.preventDefault();
    url = $(this).attr("href");

    loadContents(url);

    $(".bg-main .box").on("submit", "form", validateForm);
  });

  //fm.addEventListener("submit", validateForm, false);

  });
