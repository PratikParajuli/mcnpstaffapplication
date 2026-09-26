const form =
    document.getElementById(
        "applicationForm"
    );

const sections =
    document.querySelectorAll(
        ".form-section"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

const previousBtn =
    document.getElementById(
        "previousBtn"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );

const progress =
    document.getElementById(
        "progress"
    );

const stepText =
    document.getElementById(
        "stepText"
    );

const progressPercent =
    document.getElementById(
        "progressPercent"
    );

const message =
    document.getElementById(
        "message"
    );

const successScreen =
    document.getElementById(
        "successScreen"
    );


let currentSection = 0;


/* SHOW SECTION */

function showSection(index) {

    sections.forEach(
        (section, i) => {

            section.classList.toggle(
                "active",
                i === index
            );

        }
    );


    const percent =
        Math.round(
            ((index + 1) /
                sections.length) *
            100
        );


    progress.style.width =
        `${percent}%`;


    stepText.textContent =
        `Section ${index + 1} of ${sections.length}`;


    progressPercent.textContent =
        `${percent}%`;


    previousBtn.style.display =
        index === 0
            ? "none"
            : "block";


    nextBtn.style.display =
        index === sections.length - 1
            ? "none"
            : "block";


    submitBtn.style.display =
        index === sections.length - 1
            ? "block"
            : "none";


    message.textContent = "";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* VALIDATE */

function validateSection() {

    const current =
        sections[currentSection];


    const inputs =
        current.querySelectorAll(
            "input, select, textarea"
        );


    for (
        const input of inputs
    ) {

        if (
            input.required &&
            !input.checkValidity()
        ) {

            input.reportValidity();

            return false;

        }

    }


    message.textContent = "";

    return true;

}


/* NEXT */

nextBtn.addEventListener(
    "click",
    () => {

        if (!validateSection()) {
            return;
        }


        if (
            currentSection <
            sections.length - 1
        ) {

            currentSection++;

            showSection(
                currentSection
            );

        }

    }
);


/* PREVIOUS */

previousBtn.addEventListener(
    "click",
    () => {

        if (
            currentSection > 0
        ) {

            currentSection--;

            showSection(
                currentSection
            );

        }

    }
);


/* SUBMIT */

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        if (!validateSection()) {
            return;
        }


        /* ONE DEPARTMENT */

        const selectedDepartment =
            document.querySelector(
                'input[name="department"]:checked'
            );


        if (!selectedDepartment) {

            message.className =
                "error";

            message.textContent =
                "❌ Please select one department.";

            return;

        }


        const data = {

            realName:
                form.realName.value.trim(),

            discord:
                form.discord.value.trim(),

            minecraft:
                form.minecraft.value.trim(),

            age:
                form.age.value,

            phone:
                form.phone.value.trim(),

            email:
                form.email.value.trim(),

            membership:
                form.membership.value,


            department:
                selectedDepartment.value,


            departmentReason:
                form.departmentReason
                    .value
                    .trim(),


            previousStaff:
                form.previousStaff.value,

            previousExperience:
                form.previousExperience
                    .value
                    .trim(),

            skills:
                form.skills.value.trim(),

            activity:
                form.activity.value,


            situation1:
                form.situation1.value
                    .trim(),

            situation2:
                form.situation2.value
                    .trim(),

            situation3:
                form.situation3.value
                    .trim(),


            support1:
                form.support1.value
                    .trim(),

            support2:
                form.support2.value
                    .trim(),


            event1:
                form.event1.value
                    .trim(),

            event2:
                form.event2.value
                    .trim(),


            media1:
                form.media1.value
                    .trim(),

            media2:
                form.media2.value
                    .trim(),


            hours:
                form.hours.value,

            whyYou:
                form.whyYou.value
                    .trim(),

            anythingElse:
                form.anythingElse.value
                    .trim()

        };


        submitBtn.disabled = true;

        submitBtn.textContent =
            "⏳ Submitting...";


        try {

            const response =
                await fetch(

                    "/.netlify/functions/submit-application",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                data
                            )

                    }

                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.error ||
                    "Submission failed"
                );

            }


            form.style.display =
                "none";


            document.querySelector(
                ".progress-container"
            ).style.display =
                "none";


            document.querySelector(
                ".header"
            ).style.display =
                "none";


            successScreen.style.display =
                "block";


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });


        } catch (error) {

            console.error(error);


            message.className =
                "error";


            message.textContent =
                "❌ Failed to submit application. Please try again.";


            submitBtn.disabled =
                false;


            submitBtn.textContent =
                "🚀 Submit Application";

        }

    }
);


/* START */

showSection(0);
