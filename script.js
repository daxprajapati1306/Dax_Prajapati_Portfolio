/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }



  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const topBtn =
    document.getElementById("topBtn");


  if (topBtn) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {

        topBtn.classList.add("show");

      } else {

        topBtn.classList.remove("show");

      }

    });


    topBtn.addEventListener("click", () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    });

  }



  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  document
    .querySelectorAll(".navbar-nav .nav-link")
    .forEach(link => {

      link.addEventListener("click", () => {

        const nav =
          document.getElementById("mainNav");


        if (
          nav &&
          nav.classList.contains("show") &&
          window.bootstrap
        ) {

          bootstrap.Collapse
            .getOrCreateInstance(nav)
            .hide();

        }

      });

    });



  /* =======================================================
     CALCULATOR
  ======================================================= */

  const display =
    document.getElementById("calcDisplay");


  let expression = "";


  function safeExpression(value) {

    const allowed =
      /^[0-9+\-*/%.() ]+$/;

    return allowed.test(value)
      ? value
      : "";

  }


  document
    .querySelectorAll("[data-calc]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const type =
          button.dataset.calc;


        const value =
          button.dataset.value || "";



        /* CLEAR */

        if (type === "clear") {

          expression = "";

        }



        /* BACKSPACE */

        else if (type === "back") {

          expression =
            expression.slice(0, -1);

        }



        /* NUMBER */

        else if (type === "number") {

          expression += value;

        }



        /* OPERATOR */

        else if (type === "operator") {

          if (
            !expression &&
            value !== "-"
          ) {

            return;

          }


          expression =
            expression.replace(
              /[+\-*/%.]+$/,
              ""
            ) + value;

        }



        /* EQUALS */

        else if (type === "equals") {

          try {

            const clean =
              safeExpression(expression);


            if (
              !clean ||
              !/[0-9]/.test(clean)
            ) {

              throw new Error();

            }


            const result =
              Function(
                '"use strict"; return (' +
                clean +
                ')'
              )();


            if (!Number.isFinite(result)) {

              throw new Error();

            }


            expression =
              String(
                Math.round(
                  result * 100000000
                ) / 100000000
              );

          }


          catch {

            expression = "";

            display.textContent =
              "Error";


            setTimeout(() => {

              display.textContent =
                "0";

            }, 900);


            return;

          }

        }


        display.textContent =
          expression || "0";

      });

    });



  /* =======================================================
     INTERACTIVE MIND MAP
  ======================================================= */

  const pulseBtn =
    document.getElementById("pulseMap");


  const map =
    document.querySelector(".mind-map");


  if (pulseBtn && map) {

    pulseBtn.addEventListener(
      "click",
      () => {

        map.classList.remove(
          "pulsing"
        );


        void map.offsetWidth;


        map.classList.add(
          "pulsing"
        );


        setTimeout(() => {

          map.classList.remove(
            "pulsing"
          );

        }, 2200);

      }
    );

  }



  /* =======================================================
     ANIMATED NETWORK BACKGROUND
  ======================================================= */

  const canvas =
    document.getElementById(
      "networkCanvas"
    );


  if (!canvas) {

    return;

  }


  const ctx =
    canvas.getContext("2d");


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const particles = [];


  const particleCount = 34;



  /* RESIZE CANVAS */

  function resizeCanvas() {

    const rect =
      canvas.getBoundingClientRect();


    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );


    canvas.width =
      rect.width * dpr;


    canvas.height =
      rect.height * dpr;


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

  }


  resizeCanvas();


  window.addEventListener(
    "resize",
    resizeCanvas
  );



  /* CREATE PARTICLES */

  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    particles.push({

      x:
        Math.random() *
        window.innerWidth,

      y:
        Math.random() *
        window.innerHeight,

      vx:
        (Math.random() - 0.5) *
        0.25,

      vy:
        (Math.random() - 0.5) *
        0.25,

      r:
        Math.random() * 1.7 + 0.5

    });

  }



  /* DRAW NETWORK */

  function drawNetwork() {

    const width =
      canvas.clientWidth;


    const height =
      canvas.clientHeight;


    ctx.clearRect(
      0,
      0,
      width,
      height
    );



    /* PARTICLES */

    for (const particle of particles) {

      if (!reducedMotion) {

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

      }


      if (
        particle.x < 0 ||
        particle.x > width
      ) {

        particle.vx *= -1;

      }


      if (
        particle.y < 0 ||
        particle.y > height
      ) {

        particle.vy *= -1;

      }


      ctx.beginPath();


      ctx.arc(
        particle.x,
        particle.y,
        particle.r,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        "rgba(167,139,250,.65)";


      ctx.fill();

    }



    /* CONNECTIONS */

    for (
      let i = 0;
      i < particles.length;
      i++
    ) {

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {

        const a =
          particles[i];


        const b =
          particles[j];


        const dx =
          a.x - b.x;


        const dy =
          a.y - b.y;


        const distance =
          Math.hypot(dx, dy);


        if (distance < 125) {

          ctx.beginPath();


          ctx.moveTo(
            a.x,
            a.y
          );


          ctx.lineTo(
            b.x,
            b.y
          );


          ctx.strokeStyle =
            `rgba(103,232,249,${
              .12 *
              (1 - distance / 125)
            })`;


          ctx.stroke();

        }

      }

    }



    if (!reducedMotion) {

      requestAnimationFrame(
        drawNetwork
      );

    }

  }


  drawNetwork();

});