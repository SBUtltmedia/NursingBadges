var badges = ["Creativity", "Garageband", "Keynote", "Numbers", "Pages", "Productivity", "iMovie", "iPad"];
var badgesAwarded = {}
badges.forEach(function (x) {
    badgesAwarded[x] = false;
})
var netid = location.hash.split("#")[1];
var badgeCount = 0;
var person;

function resize() {
    var targetWidth = 16;
    var targetHeight = 9;
    var w = $(window).width();
    var h = $(window).height();
    // If the aspect ratio is greater than or equal to 4:3, fix height and set width based on height
    if ((w / h) >= targetWidth / targetHeight) {
        stageHeight = h;
        stageWidth = (targetWidth / targetHeight) * h;
        stageLeft = (w - stageWidth) / 2;
        stageTop = 0;
        //$("#title").css("font-size", 1.2 * (x / y) + "rem")
    } else {
        stageWidth = w;
        stageHeight = (targetHeight / targetWidth) * w;
        stageTop = (h - stageHeight) / 2;
        stageLeft = 0;
    }
    $("#holder").css({
        width: stageWidth + "px",
        height: stageHeight + "px",
        left: stageLeft + "px",
        top: stageTop + "px"
    });
    $("html").css("font-size", (stageHeight / 60) + "px");
    $("title").html();

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
            titleText += "<div id='copy'>Click here to share your badges with others</div>";
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

        $('#copy').on("touchstart click", function () {
            copyToClipboard()
        })
    });
});

function copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}


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
