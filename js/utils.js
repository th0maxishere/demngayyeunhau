function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function loadWave(date, top_title, bottom_title) {

    if (top_title == '') {
        top_title = "Đang yêu";
    }
    if (bottom_title == '') {
        bottom_title = "Ngày";
    }

    document.getElementById("top").innerHTML = top_title;
    document.getElementById("bottom").innerHTML = bottom_title
    document.getElementById("counter").innerHTML = calculateDays();
    //
}

function calculateDays() {
    var userDateInput = '2024/02/05';
    var userDate = new Date(userDateInput);
    var currentDate = new Date();

    // Chuyển ngày về dạng timestamp (milliseconds)
    var userTimestamp = userDate.getTime();
    var currentTimestamp = currentDate.getTime();

    // Tính số ngày chênh lệch
    var difference = currentTimestamp - userTimestamp;
    var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    // document.getElementById("result").innerHTML = "Số ngày từ ngày " + userDate.toDateString() + " đến ngày hôm nay là: " + daysDifference + " ngày.";
    return daysDifference;
}

function getMileStoneDay(day) {
    var mile = 0;
    var rs = 0;
    while (true) {
        mile += 100;
        if (mile > day) {
            rs = mile;
            break;
        }
    }
    return rs;
}

function changePercent(lovedays) {
    $('.loader').loader();

    var mile = getMileStoneDay(lovedays);
    var day = lovedays;

    var count = 0;
    if (day > 100) {
        count = 100 - (mile % day);
        if (count == 0) {
            count = 100;
        }
    } else {
        count = day;
    }
    var progr = 0;
    setInterval(function () {
        if (progr <= count) {
            $('.loader').loader('setProgress', ++progr);
        }
    }, 100);
}

function loadAvatar(imgSrc, type) {
    if (imgSrc == '') {
        if (type == '1') {
            imgSrc = 'img/no_avatar_male.jpg';
        } else if (type == '2') {
            imgSrc = 'img/no_avatar_female.jpg';
        }
    }
    if (type == '1') {
        document.getElementById('avatar_1')
            .setAttribute(
                'src', imgSrc
            );
    } else if (type == '2') {
        document.getElementById('avatar_2')
            .setAttribute(
                'src', imgSrc
            );
    }
}

function loadNickname(nickname, type) {
    if (nickname == '') {
        if (type == '1') {
            nickname = "Tên hiển thị 1";
        } else if (type == '2') {
            nickname = "Tên hiển thị 2";
        }
    }
    if (type == '1') {
        document.getElementById('nickname_1').innerText = nickname;
    } else if (type == '2') {
        document.getElementById('nickname_2').innerText = nickname;
    }
}

function loadBG(wall) {
    if (wall == '') {
        wall = '/wallpaper/w_255.webp';
    }
    $(document).ready(function () {
        $('body').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))' + ',' + 'url(' + wall + ')');
    });
}


function loadFont(font) {
    if (font == '') {
        font = 'BaseFiolexGirl';
    }
    $(document).ready(function () {
        $('.title').css('font-family', font);
        $('.top').css('font-family', font);
        $('.counter').css('font-family', font);
        $('.bottom').css('font-family', font);
        $('.nickname').css('font-family', font);
    });
}

function loadColor(color, type) {
    if (color == '') {
        color = "#FFFFFF";
    }
    //
    switch (type) {
        case '1':
            $(document).ready(function () {
                $('.top').css('color', color);
            });
            setTimeout(function () {
                fillColoriv("#iv_top_color", color);
            }, 500);
            break;
        case '2':
            $(document).ready(function () {
                $('.counter').css('color', color);
            });
            setTimeout(function () {
                fillColoriv("#iv_lovedays_color", color);
            }, 500);
            break;
        case '3':
            $(document).ready(function () {
                $('.bottom').css('color', color);
            });
            setTimeout(function () {
                fillColoriv("#iv_bottom_color", color);
            }, 500);
            break;
        case '4':
            $(document).ready(function () {
                $('#nickname_1').css('color', color);
            });
            setTimeout(function () {
                fillColoriv("#iv_nickname_1_color", color);
            },500);
            break;
        case '5':
            $(document).ready(function () {
                $('#nickname_2').css('color', color);
            });
            setTimeout(function () {
                fillColoriv("#iv_nickname_2_color", color);
            },500);
            break;
    }
}

function getColorDom(id) {
    if (document.getElementById(id).style.color == '') {
        return "#FFFFFF";
    }
    return colorToHex(document.getElementById(id).style.color);
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16).toUpperCase();
};

function fillColoriv(id, color) {
    if (color == '') {
        color = "#FFFFFF";
    }
    //
    $(document).ready(function () {
        $(id).css('background-color', color);
    });
}


function gotoLinkStore() {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        window.location.href = "market://details?id=com.addev.beenlovememory";
    } else {
        if ((navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
            (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
            (navigator.userAgent.toLowerCase().indexOf("ipod") > -1)) {
            window.location.href = 'https://goo.gl/ftSHaB';//ios link
        } else {
            //web
            window.location.href = 'https://goo.gl/hp2Xxm'; // default link = gooogle play
        }
    }

}

function goLoveTest() {
    window.location.href = 'kiem-tra-tinh-yeu.html';
}

function gotoFanpage() {
    window.location.href = 'https://www.facebook.com/beenlovememory/';
}

function gotoDanhNgonTY() {
    // window.location.href = 'https://beenlovememory.app/danhngontinhyeu/';
    window.open('/danhngontinhyeu', '_blank');
}
