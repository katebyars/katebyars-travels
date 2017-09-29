let apiKey = require('./../.env').apiKey;
export class Map {

  constructor(){
  }


  doctorsByIssue (issue, user_key){
    let requestURL = 'https://api.betterdoctor.com/2016-03-01/doctors?query=' + issue + '&location=or-portland&skip=0&limit=10&user_key='+ user_key;

    $.get(requestURL).then(function(data) {
      if (data.data && data.data.length > 0) {
        let doctors = [];
        $(".well").toggle();
        $.each(data.data, function(i, rep) {
          let doctor = new Doctor(rep.profile.first_name, rep.profile.last_name, rep.profile.title, rep.profile.bio, rep.practices[0].phones[0].number, rep.practices[0].visit_address.street, rep.practices[0].visit_address.street2, rep.practices[0].visit_address.city, rep.practices[0].visit_address.state, rep.practices[0].visit_address.zip, rep.profile.image_url, rep.practices[0].accepts_new_patients);
          doctors.push(doctor);
        });

        doctors.forEach(function(doctor){
          $("#searchResult").append('<div class="col-md-6">' + '<img src="' + doctor.image + '">' + '<h2>'+ doctor.first + ' ' + doctor.last + ' ' + doctor.title  + '</h2>' + '<p>' + doctor.bio + '</p>' +  '<p> Phone Number: ' + doctor.phone + '</p>' + '<p>Address: ' + doctor.numberAddress + ' ' + doctor.numberAddress2 + ' ' + doctor.city + ' ' + doctor.state  + ' ' + doctor.zip + '</p>' + '<p class="'+ 'doctor.accepts">' + doctor.acceptsPatients(doctor.accepts) +
          '</p>' + '</div>');
        });
      }
      else {
        $("#showErrors").append('<p>There are no doctors who cover this issue!</p>');
        }

    }).fail(function(error) {
      $("#showErrors").append(`There was an error processing your request: ${error.responseText}. Please try again`);
    });
  }
}
