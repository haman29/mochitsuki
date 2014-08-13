

//// Initialize Firebase.
var firebaseRef = getRef();

function init() {
    // TODO: Replace above line with:
    // var ref = new Firebase('<YOUR FIREBASE URL>');

    //// Create ACE
    var editor = ace.edit("firepad");
    editor.setTheme("ace/theme/textmate");
    var session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setMode("ace/mode/javascript");

    // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
    //var userId = Math.floor(Math.random() * 9999999999).toString();
    var userId = getUserId();

    //// Create Firepad.
    var firepad = Firepad.fromACE(firebaseRef, editor, {userId: userId});

    //// Create FirepadUserList (with our desired userId).
    var firepadUserList = FirepadUserList.fromDiv(firebaseRef.child('users'), firepad, document.getElementById('userlist'), userId);

    //// Initialize contents.
    firepad.on('ready', function() {
        if (firepad.isHistoryEmpty()) {
            firepad.setText('// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}');
        }
    });
}

// Helper to get hash from end of URL or generate a random one.
function getRef() {
    // var ref = new Firebase('https://firepad.firebaseio-demo.com');
    var ref = new Firebase('https://blazing-heat-3720.firebaseio.com/');
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
        ref = ref.child(hash);
    } else {
        ref = ref.push(); // generate unique location.
        window.location = window.location + '#' + ref.name(); // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined')
        console.log('Firebase data: ', ref.toString());
    return ref;
}

function getUserId() {
    if(!$.cookie('userId')) {
        $.cookie('userId', generateUserId());
    }
    return $.cookie('userId');
}

function generateUserId() {
    var rawText = parseInt(new Date()/1000) +
        "satori" + Math.floor(Math.random() * 1000);
    var shaObj = new jsSHA(rawText, 'TEXT');
    return shaObj.getHash('SHA-1', 'HEX');
}

$(document).ready(function(){
    init();
    firebaseRef.on('child_changed', function(snapshot) {

        if (isDriver(firebaseRef, getUserId())) {
            $('#beADriver').addClass('driver');
        } else {
            $('#beADriver').removeClass('driver');
        }
    });

    $('#beADriver').click(function (e) {
        changeDriver(firebaseRef);
    });});
