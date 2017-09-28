const {dialog} = require('electron').remote;
var fs = require('fs');

$(document).ready(function(){

  function initSlider(images){
    var sliderContainer = document.getElementById('slider');
    for (image of images){
      var slide = document.createElement('DIV');
      slide.setAttribute('style', "background:url('" + image + "')  no-repeat top");
      slide.setAttribute('class', 'content-full');
      sliderContainer.prepend(slide);
    }
    $(".owl-carousel").owlCarousel({
      items:2,
      loop:true,
      autoplay:true,
      autoplayTimeout: 5000
    });
  }

  var timer;
  function calcDaysLeft(end){
    var endDate = new Date(end);
    var curDate = new Date();
    var _day = 86400000;

    var distance = endDate - curDate;
    if (distance < 0){
      clearInterval(timer);
    }

    var daysLeft = Math.floor(distance / _day);

    document.getElementById('days').innerHTML = daysLeft + 1;
  }

  function showDialog(){
    dialog.showOpenDialog({
      filters: [
        {name: 'Pictures', extensions: ['jpg', 'png', 'bmp']}
      ],
      properties: [
        'multiSelections'
      ]
    }, function(fileURLs){
      fs.writeFile('/home/chinaza/Desktop/CPC/db.txt', JSON.stringify(fileURLs), function(err) {console.log(err)});
      if (fileURLs === undefined) return;
      initSlider(fileURLs);
    });
  }

  function loadPrevSelFiles(){
    fs.readFile('/home/chinaza/Desktop/CPC/db.txt', 'utf8', function (err, data) {
      if (err) return console.log(err);
      var res = JSON.parse(data);
      initSlider(res);
    });
  }

  timer = setInterval(function(){
    calcDaysLeft('October 01, 2017 12:00:00')
  }, 1000);

  loadPrevSelFiles();

  $("#days").click(function(event) {
    showDialog();
  });

});
