/**
 * Created by eritikass on 18/03/16.
 */

Meteor.methods({
    gettime: function() {
        return +new Date()
    }
})