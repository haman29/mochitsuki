
function isDriver(ref, userId, callback) {
    ref.once('value', function(snapshot) {
        var driver = snapshot.val().driver;
        callback(driver === userId);
    });
}

function changeDriver(ref) {
    ref.child('driver').set(satori.getUserId());
}
