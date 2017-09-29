import { Travel } from './../js/travel.js';

$(document).ready(function() {
  $('#search-form').submit(function(e) {
    e.preventDefault();
    let issue = $('#issue').val();
    var apiKey = require('./../.env').apiKey;
    let map = new Map();
    doctor.doctorsByIssue(issue, apiKey);
  $("input").val("");
  $("#searchResult").empty();
  });
});
