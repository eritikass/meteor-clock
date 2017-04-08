var flags = [].concat([
    {name: 'Estonia', tz: 'Europe/Tallinn'},
    {name: 'Eve', tz: 'Eve-Online', 'png': true},
    {name: 'Sweden', tz: 'Europe/Stockholm'},

    {break: true}
],
    _.shuffle([
    {name: 'Norway', tz: 'Europe/Oslo'},
    {name: 'Denmark', tz: 'Europe/Copenhagen'},
    {name: 'Finland', tz: 'Europe/Helsinki'},
    {name: 'Germany', tz: 'Europe/Berlin'},
    {name: 'Poland', tz: 'Europe/Warsaw'},
    {name: 'Luxembourg', 'tz': 'Europe/Luxembourg'/*, 'flagurl': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg'*/},

    {name: 'Ireland', tz: 'Europe/Dublin'},
    {name: 'Spain', tz: 'Europe/Madrid'},
    {name: 'Turkey', tz: 'Europe/Istanbul'},
    {name: 'Switzerland', tz: 'Europe/Bern'},

    {name: 'Scotland', tz: 'Europe/Edinburgh'},
    {name: 'UK', tz: 'Europe/London'}
]),
    [
    {break: true},

    {name: 'Australia', tz: 'Australia/Sydney'},

    {tz: 'US/Pacific', flag: 'us'},
    {tz: 'US/Central', flag: 'us'},
    {tz: 'US/Eastern', flag: 'us'}
]);

Session.set('time_dif', 0);
Session.set('timezone', 'Europe/Tallinn')

moment.tz.link([
    'Eve-Online|GMT',
    'CST|Asia/Shanghai',
    'Europe/Edinburgh|Europe/London'
])

function setTime() {
    Session.set('time', new Date(+new Date() - Session.get('time_dif')))
}

function fixTime() {
    Meteor.call('gettime', function (err, time) {
        if (!err && time) {
            Session.set('time_dif', +new Date() - time)
        }
    })
}

function setTz(tz) {
    try {
        if (tz && moment.tz.zone(tz)) {
            Session.set('timezone', tz)
        }
    } catch (e) {
    }
}

Meteor.setInterval(setTime, 1000)
Meteor.setInterval(fixTime, 20000)

// insta run
setTime()
fixTime()

// set default tz
try {
    // ???: http://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone)
} catch (e) {
}


function getNr2(number) {
    return number >= 10 ? number : '0' + number
}

Template.body.helpers({

    hours: _.range(0, 12),

    buttons: function () {
        return flags;
    },

    getflag: function() {
        if (this.flagurl) {
            return this.flagurl;
        }
        return (this.flag || this.name) ? '/flag/' + (this.flag || this.name) + '.' + (this.png ? 'png' : 'svg') : false;
    },

    getname: function() {
        return this.name ? this.name : this.tz;
    },


    gettimezones: function () {
        return moment.tz.names()
    },

    testtimezone: function () {
        return this == Session.get('timezone') ? 'selected' : ''
    },

    degrees: function () {
        return 30 * this;
    },

    handData: function () {
        var oTime = moment(Session.get('time') || new Date()).tz(Session.get('timezone'))
        return {
            hourDegrees: oTime.hour() * 30,
            minuteDegrees: oTime.minutes() * 6,
            secondDegrees: oTime.seconds() * 6
        }
    },

    getStr: function () {
        var oTime = moment(Session.get('time') || new Date()).tz(Session.get('timezone'))
        return [getNr2(oTime.hour()), getNr2(oTime.minutes()), getNr2(oTime.seconds())].join(':')
    },

    radial: function (angleDegrees,
                      startFraction,
                      endFraction) {
        var r = 100
        var radians = (angleDegrees - 90) / 180 * Math.PI

        return {
            x1: r * startFraction * Math.cos(radians),
            y1: r * startFraction * Math.sin(radians),
            x2: r * endFraction * Math.cos(radians),
            y2: r * endFraction * Math.sin(radians)
        }
    }
})


Template.body.events({
    'change #timezone': function (event) {
        Session.set('timezone', event.target.value)
        setTime()
    },
    'click .setlang': function (event) {
        setTz(jQuery(event.target).closest('button').data('tz'))
    }
})

