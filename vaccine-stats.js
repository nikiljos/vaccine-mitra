vaccineStats()

function vaccineStats() {
  url = "https://keralastats.coronasafe.live/vaccination_summary.json"

  axios.get(url)
    .then(function(response) {
      vacData = response.data
      console.log(vacData)
      document.getElementById('vData').innerHTML = "<b>" + vacData.summary.tot_person_vaccinations + "</b> citizens have already took their first dose in Kerala.<br>Be a smart citizen and take your shot as soon as possible."
    })
}