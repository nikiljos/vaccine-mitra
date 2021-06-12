var input = document.getElementById("pin");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button-vac").click();
  }
});

function vaccineResult() {

  pin = document.getElementById('pin').value

  console.log(pin)


  document.getElementById('res').innerHTML = ""
  document.getElementById('summary').innerHTML = ""




  // console.log(district)


  // var result = ""

  var tCap = 0


  let centersArray = new Array;



  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  var formattedDate = date + "-" + month + "-" + year;

  // console.log(formattedDate)

  url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=" + formattedDate;
  axios.get(url)
    .then(function(response) {
      cowinData = response.data
        // console.log(url)



      function length(jsonData) {
        return Object.keys(jsonData).length;
      }

      x = length(cowinData.centers);


      // console.log(x)

      // dName = cowinData.sessions[0].district_name

      var availableCap = 0;

      // if (resError == 1) {
      //   let er = "<div > Sorry, Seems like some error occured.Pls try again < /div>"
      // }

      if (cowinData != "") {



        for (m = 0; m < x; m++) {




          y = length(cowinData.centers[m].sessions)

          for (n = 0; n < y; n++) {

            var cap = cowinData.centers[m].sessions[n].available_capacity;
            availableCap = availableCap + cap

            if (cap > 0) {

              let divCode = "<div class='col-md-4'><div class='card mb-4 box-shadow'><div class='card-body'> <p class='card-text'><b>Center:</b> " +
                cowinData.centers[m].name + "<br> <b>Vaccine Name:</b>" + cowinData.centers[m].sessions[n].vaccine +
                "<br> <b>Date:</b> " + cowinData.centers[m].sessions[n].date + " <br> <b>Slots Available:</b> " + cowinData.centers[m].sessions[n].available_capacity +
                "<br> <b>Mininum Age:</b> " + cowinData.centers[m].sessions[n].min_age_limit + "<br> </p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button type='button' class='btn btn-sm btn-outline-secondary'><span class='small-font'>Dose 1</span><br>" +
                cowinData.centers[m].sessions[n].available_capacity_dose1 + "</button><button type='button' class='btn btn-sm btn-outline-secondary'><span class='small-font'>Dose 2</span><br>" +
                cowinData.centers[m].sessions[n].available_capacity_dose2 + "</button></div> <small class='text-muted'><a href='https://selfregistration.cowin.gov.in/'>Book your slot</a></small></div> </div> </div></div>"
              document.getElementById('res').innerHTML += divCode
            }








          }
        }




        // console.log("Kot?tayam")



        tCap = tCap + availableCap;

        document.getElementById('summary').innerHTML = "Availble slots: " + availableCap + "<br>Total centres listed: " + x
        document.getElementById('cowinURL').innerHTML = "<a href='" + url + "' target='_blank'>CoWin API</a>"

      }
    })
    .catch(function(error) {
      // handle error
      // console.log(error);
      console.log("error in response", error)
      resError = 1;

    })
}