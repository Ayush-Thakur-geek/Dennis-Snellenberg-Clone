function logoExpand() {
    let logo = document.getElementById("logo");
    let a = document.getElementsByClassName("logo-link")[0];
    let codeBy = document.getElementsByClassName("code-by")[0];
    let hidden = document.getElementsByClassName("hidden")[0];
    let credit = document.getElementsByClassName("credit")[0];
    
    logo.addEventListener("mouseover", function() {
        a.style.transition = "width 0.5s, transform 0.5s";
        hidden.style.transition = "width 0.5s, transform 0.5s";
        codeBy.style.transition = "transform 0.5s";
        credit.style.transition = "transform 0.5s";
        a.style.width = "170px";
        hidden.style.width = "70px";
        hidden.style.transform = "translateX(-70px)";
        codeBy.style.transform = "translateX(-70px)";
        credit.style.transformOrigin = "center";
        credit.style.transform = "rotate(360deg)";
    });
    
    logo.addEventListener("mouseout", function() {
        a.style.transition = "width 0.5s, transform 0.5s";
        hidden.style.transition = "width 0.5s, transform 0.5s";
        codeBy.style.transition = "transform 0.5s";
        credit.style.transition = "transform 0.5s";
        hidden.style.width = "54px";
        a.style.width = "150px";
        hidden.style.transform = "translateX(0px)";
        codeBy.style.transform = "translateX(0px)";
        credit.style.transformOrigin = "center";
        credit.style.transform = "rotate(-360deg)";
    });
}

function dot() {
    let dot  = document.getElementsByClassName("dot");
    let work = document.getElementById("work");
    let about = document.getElementById("about");
    let contact = document.getElementById("contact");
    work.addEventListener("mouseover", function() {
        dot[0].style.opacity = "1";
        dot[0].style.transition = "opacity 0.5s";
    });
    about.addEventListener("mouseover", function() {
        dot[1].style.opacity = "1";
        dot[1].style.transition = "opacity 0.5s";
    });
    contact.addEventListener("mouseover", function() {
        dot[2].style.opacity = "1";
        dot[2].style.transition = "opacity 0.5s";
    });

    work.addEventListener("mouseout", function() {
        dot[0].style.opacity = "0";
        dot[0].style.transition = "opacity 0.5s";
    });
    about.addEventListener("mouseout", function() {
        dot[1].style.opacity = "0";
        dot[1].style.transition = "opacity 0.5s";
    });
    contact.addEventListener("mouseout", function() {
        dot[2].style.opacity = "0";
        dot[2].style.transition = "opacity 0.5s";
    });
}

function magnetic() {
    let magnet = document.getElementsByClassName("magnet");
    let magnetElem = document.getElementsByClassName("magnet-elem");
    for (let i = 0; i < magnet.length; i++) {
        // for (let j = 0; j < magnetElem.length; j++) {
        //     // magnet[i].addEventListener("mousemove", function(event){
        //     //     magnetElem[i].style.transition = "transform 0.2s";
        //     //     magnetElem[i].style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        //     // });

            

        //     magnet[i].addEventListener("mouseleave", function(event){
        //         magnetElem[i].style.transition = "transform 0.5s";
        //         magnetElem[i].style.transform = `translate(${0}px, ${0}px)`;
        //     });
        // }
        magnet[i].addEventListener("mousemove", function(event) {
            let rect = magnet[i].getBoundingClientRect();
            let centerX = rect.left + rect.width / 2;
            let centerY = rect.top + rect.height / 2;
            let x = event.clientX - centerX;
            let y = event.clientY - centerY;
            if ((x < 50 || x > -50) && (y < 50 || y > -50)) {
                magnet[i].style.transition = "transform 0.2s ease-out";
                magnet[i].style.transform = `translate(${x}px, ${y}px)`;
            } else {
                magnet[i].style.transition = "transform 0.2s ease-out";
                magnet[i].style.transform = `translate(${0}px, ${0}px)`;
            }
        });

        magnet[i].addEventListener("mouseleave", function(event) {
            magnet[i].style.transition = "transform 0.2s ease-out";
            magnet[i].style.transform = `translate(${0}px, ${0}px)`;
        });
    }
}

magnetic();
logoExpand();
dot();