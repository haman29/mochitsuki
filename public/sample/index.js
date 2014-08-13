var satori = (function(){
  function init() {
    //// Initialize Firebase.
    var firepadRef = getExampleRef();
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
    var userId = Math.floor(Math.random() * 9999999999).toString();

    //// Create Firepad.
    var firepad = Firepad.fromACE(firepadRef, editor, {userId: userId});

    //// Create FirepadUserList (with our desired userId).
    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'), firepad, document.getElementById('userlist'), userId);

    //// Initialize contents.
    firepad.on('ready', function() {
      if (firepad.isHistoryEmpty()) {
        firepad.setText('// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}');
      }
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  function getExampleRef() {
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
  return {
    init: init,
  };
})();
$(document).ready(function(){
  satori.init();
});
