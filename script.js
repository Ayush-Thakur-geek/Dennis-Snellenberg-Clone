function logoExpand() {
  let logo = document.getElementById("logo");
  let a = document.getElementsByClassName("logo-link")[0];
  let codeBy = document.getElementsByClassName("code-by")[0];
  let hidden = document.getElementsByClassName("hidden")[0];
  let credit = document.getElementsByClassName("credit")[0];

  logo.addEventListener("mouseover", function () {
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

  logo.addEventListener("mouseout", function () {
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
  let dot = document.getElementsByClassName("dot");
  let work = document.getElementById("work");
  let about = document.getElementById("about");
  let contact = document.getElementById("contact");
  work.addEventListener("mouseover", function () {
    dot[0].style.opacity = "1";
    dot[0].style.transition = "opacity 0.5s";
  });
  about.addEventListener("mouseover", function () {
    dot[1].style.opacity = "1";
    dot[1].style.transition = "opacity 0.5s";
  });
  contact.addEventListener("mouseover", function () {
    dot[2].style.opacity = "1";
    dot[2].style.transition = "opacity 0.5s";
  });

  work.addEventListener("mouseout", function () {
    dot[0].style.opacity = "0";
    dot[0].style.transition = "opacity 0.5s";
  });
  about.addEventListener("mouseout", function () {
    dot[1].style.opacity = "0";
    dot[1].style.transition = "opacity 0.5s";
  });
  contact.addEventListener("mouseout", function () {
    dot[2].style.opacity = "0";
    dot[2].style.transition = "opacity 0.5s";
  });
}

function magnetic() {
  let magnet = document.getElementsByClassName("magnet");
  let magnetElem = document.getElementsByClassName("magnet-elem");
  for (let i = 0; i < magnet.length; i++) {
    magnet[i].addEventListener("mousemove", function (event) {
      let rect = magnet[i].getBoundingClientRect();
      let centerX = rect.left + rect.width / 2;
      let centerY = rect.top + rect.height / 2;
      let x = event.clientX - centerX;
      let y = event.clientY - centerY;
      if ((x < 40 || x > -40) && (y < 40 || y > -40)) {
        magnet[i].style.transition = "transform 0.2s ease-out";
        magnet[i].style.transform = `translate(${x}px, ${y}px)`;
      } else {
        magnet[i].style.transition = "transform 0.2s ease-out";
        magnet[i].style.transform = `translate(${0}px, ${0}px)`;
      }
    });

    magnet[i].addEventListener("mouseleave", function (event) {
      magnet[i].style.transition = "transform 0.2s ease-out";
      magnet[i].style.transform = `translate(${0}px, ${0}px)`;
    });
  }
}

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

const elems = gsap.utils.toArray(".scroll");
const loop = horizontalLoop(elems, { paused: false, repeat: -1 });

magnetic();
logoExpand();
dot();
