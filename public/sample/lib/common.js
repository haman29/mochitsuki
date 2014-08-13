
function getDriver(ref) {
    var driver;
    ref.once('value', function(snapshot) {
        driver = snapshot.val().driver;
    });
    return driver;
}

function isDriver(ref, userId) {
    var driver = getDriver(ref)
    console.log('driver: '+  driver);
    console.log('userId: '+  userId);
    return (getDriver(ref) === userId);
}

function changeDriver(ref) {
    ref.child('driver').set(getUserId());
}
