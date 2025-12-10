
/*************How to Use******************
customConfirm("Are you sure you want to delete this?").then((result) => {
  if (result) {
    console.log("User clicked Yes");
  } else {
    console.log("User clicked No or Esc");
  }
});

*******************************/
(function (g) {
  function p(msg) {
    return new Promise((resolve) => {
      // Overlay
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0,0,0,0.6)";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = "9999";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s ease";

      // Box
      const box = document.createElement("div");
    //   box.style.background = "#fff";
      box.style.background = 'linear-gradient(135deg,#fff2d4,#ffe3b3)';
      box.style.padding = "50px";
      box.style.borderRadius = "10px";
      box.style.width = "350px";
      box.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      box.style.textAlign = "center";
      box.style.transform = "scale(0.8)";
      box.style.transition = "transform 0.3s ease";

      const title = document.createElement("h4");
      title.innerText = msg;
      title.style.marginBottom = "15px";
      title.style.color = "black";

      const btnRow = document.createElement("div");

      const yes = document.createElement("button");
      yes.innerText = "Yes";
      yes.style.background = "#28a745";
      yes.style.color = "#fff";
      yes.style.border = "none";
      yes.style.borderRadius = "5px";
      yes.style.padding = "8px 15px";
      yes.style.marginRight = "5px";
      yes.style.cursor = "pointer";

      const no = document.createElement("button");
      no.innerText = "No";
      no.style.background = "#dc3545";
      no.style.color = "#fff";
      no.style.border = "none";
      no.style.borderRadius = "5px";
      no.style.padding = "8px 15px";
      no.style.cursor = "pointer";
2
      btnRow.appendChild(yes);
      btnRow.appendChild(no);

      box.appendChild(title);
      box.appendChild(btnRow);
      overlay.appendChild(box);
      document.body.appendChild(overlay);

      // ðŸŽ¯ Set initial focus on the "Yes" button
      yes.focus(); 
      
      // Animate in
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        box.style.transform = "scale(1)";
      });

      function close(val) {
        overlay.style.opacity = "0";
        box.style.transform = "scale(0.8)";
        setTimeout(() => {
          document.body.removeChild(overlay);
          resolve(val);
        }, 300); // match transition time
      }

      yes.onclick = () => close(true);
      no.onclick = () => close(false);

      // Handle Enter keypress for the focused button (Yes)
      document.addEventListener("keyup", function escHandler(e) {
        if (e.key === "Escape") {
          close(false);
          document.removeEventListener("keyup", escHandler);
        } else if (e.key === "Enter") {
           // If 'Enter' is pressed, simulate a click on the currently focused element
           // which should be the 'Yes' button unless the user has tabbed away.
           // Since we don't know the state, we can explicitly check if 'Yes' is focused,
           // or, more simply, just call close(true) as it's the intended default action.
           if (document.activeElement === yes) {
              close(true);
              document.removeEventListener("keyup", escHandler);
           }
        }
      });
    });
  }
  g.customConfirm = p;
})(window);
