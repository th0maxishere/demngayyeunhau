var db = new PouchDB('myDB');


function testPut() {
    var obj = {_id: 'myId', title: 'abcd'};
    db.put(obj).then(function (response) {
        console.log(response)
        // handle response
    }).catch(function (err) {
        console.log(err);
    });
}

function testGet() {
    db.get('myId').then(function (doc) {
        // found data
        console.log(doc);
        //
    }).catch(function (err) {
        // not found
        console.log(err)
    });
}

function testUpdate() {

    db.get('myId').then(function (doc) {

        // wave = {date_start,top_title,bottom_title}

        var old = doc;

        old.title = 'new_title';
        old.name = 'name';

        return db.put(old);
    }).then(function (response) {
        // handle response
        console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}

//---------

function put(obj) {
    db.put(obj).then(function (response) {
        console.log(response)
        // handle response
    }).catch(function (err) {
        console.log(err);
    });
}

function init() {
    db.get('mydoc').then(function (doc) {
        // found data
        console.log(doc);
        //
        loadWave(doc.date_start, doc.top_title, doc.bottom_title);
        changePercent(parseInt(getDiffDate(doc.date_start)));
        //
        loadBG(doc.wallpaper);
        loadFont(doc.font);
        //
        loadAvatar(doc.avatar_1, '1');
        loadAvatar(doc.avatar_2, '2');
        //
        loadNickname(doc.nickname_1, '1');
        loadNickname(doc.nickname_2, '2');
        //
        loadColor(doc.top_color, '1');
        loadColor(doc.love_days_color, '2');
        loadColor(doc.bottom_color, '3');
        loadColor(doc.nickname_1_color, '4');
        loadColor(doc.nickname_2_color, '5');
        //
    }).catch(function (err) {
        // not found
        if (err.status == 404) {
            var obj = {
                _id: 'mydoc',
                date_start: formatDate(new Date()),
                top_title: '',
                bottom_title: '',
                nickname_1: '',
                nickname_2: '',
                avatar_1: '',
                avatar_2: '',
                wallpaper: '',
                font: '',
                top_color: '',
                love_days_color: '',
                bottom_color: '',
                nickname_1_color: '',
                nickname_2_color: ''
            }
            put(obj)
        }
    });
}

function updateWave(wave) {
    db.get('mydoc').then(function (doc) {

        // wave = {date_start,top_title,bottom_title}

        var obj = doc;
        obj.top_title = wave.top_title;
        obj.date_start = wave.date_start;
        obj.bottom_title = wave.bottom_title;

        return db.put(obj);
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}

function updateAvatar(avatar) {
    db.get('mydoc').then(function (doc) {

        // avatar = {avatar,type}

        var obj = doc;

        if (avatar.type == '1') {
            obj.avatar_1 = avatar.avatar;
        } else if (avatar.type == '2') {
            obj.avatar_2 = avatar.avatar;
        }
        return db.put(obj);
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}

function updateNickname(nickname) {
    db.get('mydoc').then(function (doc) {

        // nickname = {nickname,type}

        var obj = doc;

        if (nickname.type == '1') {
            obj.nickname_1 = nickname.nickname;
        } else if (nickname.type == '2') {
            obj.nickname_2 = nickname.nickname;
        }
        return db.put(obj);
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}


function updateFont(font) {
    db.get('mydoc').then(function (doc) {

        // font = string

        var obj = doc;
        obj.font = font;

        return db.put(obj);
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}

function updateWallpaper(wallpaper) {
    db.get('mydoc').then(function (doc) {

        // wallpaper = string | url | base 64

        var obj = doc;
        obj.wallpaper = wallpaper;

        return db.put(obj);
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}

function updateColor(color) {
    db.get('mydoc').then(function (doc) {

        // color = {color, type}

        var obj = doc;

        switch (color.type) {
            case '1':
                obj.top_color = color.color;
                break;
            case '2':
                obj.love_days_color = color.color;
                break;
            case '3':
                obj.bottom_color = color.color;
                break;
            case '4':
                obj.nickname_1_color = color.color;
                break;
            case '5':
                obj.nickname_2_color = color.color;
                break;
        }

        return db.put(obj);
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}

//

function getDb() {
    return db;
}


// default example
function get() {
    db.get('mydoc').then(function (doc) {
        // handle doc
        console.log(doc);
        //
    }).catch(function (err) {
        console.log(err);
    });
}

function update() {
    db.get('mydoc').then(function (doc) {
        return db.put({
            _id: 'mydoc',
            _rev: doc._rev,
            title: "Let's Dance"
        });
    }).then(function (response) {
        // handle response
        console.log('Update db: ' + response);
    }).catch(function (err) {
        console.log(err);
    });
}

function destroy() {
    db.destroy().then(function (response) {
        // success
        console.log('Destroy db: ' + response)
    }).catch(function (err) {
        console.log(err);
    });
}

function remove() {
    db.get('mydoc').then(function (doc) {
        return db.remove(doc);
    }).then(function (result) {
        // handle result
        console.log('Remove doc:' + result)
    }).catch(function (err) {
        console.log(err);
    });
}