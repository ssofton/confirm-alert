let isFlutterApp = false;

// Detect if coming from Flutter
if (window.location.search.includes("app=flutter")) {
    isFlutterApp = true;
    console.log("Flutter login detected");
}

$(document).on("click", ".logout", function (e) {
    e.preventDefault();
    if (isFlutterApp) {
        sendLogoutToFlutter();
    } else {
        customConfirm("Are you sure you want to delete this?").then((result) => {
            if (result) {
                window.location.href = "logout.php";
            } else {
                console.log("User clicked No or Esc");
            }
        });
    }
});


function sendLogoutToFlutter() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler("flutterEvent", "logoutEv");
        console.log("Logout event sent to flutter");
    } else {
        console.warn("Flutter channel not found - fallback browser logout");
    }
}
