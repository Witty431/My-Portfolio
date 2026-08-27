/*
   WITNEY MULAUDZI - PORTFOLIO JAVASCRIPT
*/


/*
   MOBILE NAVIGATION
*/

const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

if (toggle && links) {

    toggle.addEventListener("click", () => {

        const isOpen = links.classList.toggle("open");

        toggle.classList.toggle("open", isOpen);

        toggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

    });


    /* Close mobile navigation when a link is clicked */

    links.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            links.classList.remove("open");

            toggle.classList.remove("open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/*
   SCROLL REVEAL AND SKILL BAR ANIMATION
*/

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }


            const element = entry.target;

            element.classList.add("visible");


            /* Animate skill bars */

            if (element.classList.contains("skill-card")) {

                const fill =
                    element.querySelector(
                        ".skill-card__fill"
                    );

                const level =
                    element.dataset.level || "0";


                if (fill) {

                    setTimeout(() => {

                        fill.style.width =
                            `${level}%`;

                    }, 100);

                }

            }


            observer.unobserve(element);

        });

    },

    {
        threshold: 0.15
    }

);


/* Observe elements */

document
    .querySelectorAll(
        ".reveal, .skill-card, .project-card"
    )
    .forEach((element) => {

        revealObserver.observe(element);

    });


/*
   ANIMATED NUMBER COUNTERS
*/

const counterObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }


            const element = entry.target;

            const target =
                parseInt(
                    element.dataset.count,
                    10
                );


            let current = 0;


            const step =
                Math.max(
                    1,
                    Math.ceil(target / 30)
                );


            const timer = setInterval(() => {

                current =
                    Math.min(
                        current + step,
                        target
                    );


                element.textContent = current;


                if (current >= target) {

                    clearInterval(timer);

                }

            }, 40);


            observer.unobserve(element);

        });

    },

    {
        threshold: 0.5
    }

);


/* Observe all counters */

document
    .querySelectorAll("[data-count]")
    .forEach((element) => {

        counterObserver.observe(element);

    });


/*
   ACTIVE NAVIGATION LINK
*/

const sections =
    document.querySelectorAll(
        "section[id], header[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav__links a"
    );


function highlightNav() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 100;


        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach((link) => {

        const target =
            link.getAttribute("href");


        if (
            target ===
            `#${currentSection}`
        ) {

            link.style.color = "#ffffff";

        } else {

            link.style.color = "";

        }

    });

}


/* Listen for page scrolling */

window.addEventListener(
    "scroll",
    highlightNav,
    {
        passive: true
    }
);


/* Set active navigation link on page load */

highlightNav();
