var badges = ["Creativity", "Garageband", "Keynote", "Numbers", "Pages", "Productivity", "iMovie", "iPad"];
var badgesAwarded = {}
badges.forEach(function (x) {
    badgesAwarded[x] = false;
})
var netid = location.hash.split("#")[1];
var badgeCount = 0;
var person;

function resize() {
    var targetWidth =12; 
    var targetHeight = 9;
    var w = $(window).width();
    var h = $(window).height();
    $("html").css("font-size", (w / 60) + "px");
    $("title").html();

}


function getLeaders(){

$.get('getawards.php',function(result){

var board = $.csv.toObjects(result);
console.log(board)
var table=$('<table/>')
for (i in board) {
count=0;
for (j in board[i]) if (board[i][j]==1) count++;
board[i].total=count
}
board = board.slice(0).sort(function(a,b) {
    return b.total - a.total;
});



for (i in board){
var row=$('<tr/>')

var td=$('<td/>')
if(board[i].total==8){
var winner= $('<img/>',{"src":"winner.svg","class":"leadWinner won"});
td.append(winner)
}
row.append(td)
var name= ["firstname"];
name.forEach(function(val){
var td=$('<td/>')
td.append(board[i][val]+" "+board[i]["lastname"] );
row.append(td)
});

badges.forEach(function(val){
var td=$('<td/>')
if(board[i][val]==1)
{
var badge= $('<img/>',{"src":"img/iPad-"+val+'.png',class:"badge"});
td.append(badge)
}
row.append(td)
});

table.append(row);

}

var back="<div id='back'>&#9166;</div>";
$('#leader').append(back);

$('#leader').append(table);


$('#leader').css({visibility:"visible",opacity:1})

               $("#back").on("click touchstart", function (evt) {
                if (event.handled === false) return
                event.stopPropagation();
                event.preventDefault();
                event.handled = true;
                $('#leader').html("");
                $('#leader').css({visibility:"hidden",opacity:0})
})


});


}




$(function () {

   $(window).on('resize', resize);
    $('body').append($('#holder'))
    $('#holder').append($('<div/>', {
        'class': 'grid'
    }))
    $.post('badges.php', {
        netid: netid
    }, function (result) {
        var resultJSON = JSON.parse(result)
        badgesAwarded = Object.assign(badgesAwarded, resultJSON.badgesAwarded);

        badgesAwarded
        person = resultJSON.info || {}
        console.log(badgesAwarded)

        var titleText = `${person.firstname} ${person.lastname} has been awarded the following badges:`

        badges.forEach(function (badgeName, index) {

            $('.grid').append($('<div/>', {
                'class': 'cell',
                id: badgeName
            }));
            $('#' + badgeName).append($('<img/>', {
                'src': 'img/' + "iPad-" + badgeName + ".png"
            }));
            var label = $('<div/>', {
                id: "label_" + badgeName,
                class: "label"

            })
            label.html(badgeName)
            var checkboxHolder = $('<div/>', {
                class: "checkboxHolder"
            })
            var checkbox = $('<div/>', {
                id: "check_" + badgeName,
                class: "hidden"
            })
            var checkImage = $('<img/>', {
                class: "check",
                src: "check.svg"
            })
            checkbox.append(checkImage);
            checkboxHolder.append(checkbox);
            $('#' + badgeName).append(label);
            $('#' + badgeName).append(checkboxHolder);

            if (badgesAwarded[badgeName]) {
                setTimeout(function () {
                    $("#check_" + badgeName).toggleClass("checked hidden")
                }, index * 100)
            }
            setTimeout(checkWinner, 1000)
            //            function isTrue(currentValue) {
            //                console.log(currentValue)
            //                return (false);
            //            }
            //            console.log(badgesAwarded.every(isTrue));



        });
        resize();
        if (person.canEdit) {
            titleText = "Please select the badges you've completed.";
            $(".cell").on("click touchstart", function (evt) {
                if (event.handled === false) return
                event.stopPropagation();
                event.preventDefault();
                event.handled = true;

                $("#check_" + this.id).toggleClass("checked hidden")
                badgesAwarded[this.id] = $('#check_' + this.id).hasClass('checked');
                if (badgesAwarded[this.id]) {
                    badgeCount++;
                }
                checkWinner();
                console.log(Object.values(badgesAwarded).every(function (item) {
                    
                    return item;
                }))

                $.post("badges.php", {
                    data: JSON.stringify(badgesAwarded)
                }, function () {});
            });
   }


        $("#title").html(titleText);
               $("#trophy").on("click touchstart", function (evt) {
                if (event.handled === false) return
                event.stopPropagation();
                event.preventDefault();
                event.handled = true;
        getLeaders()
})

    });
});



function checkWinner() {
    if (Object.values(badgesAwarded).every(function (item) {
            return item
        })) {
        $('#winner').css("visibility", "visible").animate({
            opacity: 1
        }, 1000, function () {
            $('#winnerImage').addClass("won")
        });
        $('#winner').on("touchstart click", function () {
            if (event.handled === false) return
            event.stopPropagation();
            event.preventDefault();
            event.handled = true;
            $(this).css("visibility", "hidden")
            $('#winnerImage').removeClass("won")
        })
    }
}
