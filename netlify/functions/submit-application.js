export default async (request) => {

    /* ONLY POST */

    if (request.method !== "POST") {

        return new Response(

            JSON.stringify({

                success: false,

                error:
                    "Method not allowed"

            }),

            {

                status: 405,

                headers: {

                    "Content-Type":
                        "application/json"

                }

            }

        );

    }


    try {

        const data =
            await request.json();


        /* REQUIRED */

        if (

            !data.realName ||

            !data.discord ||

            !data.minecraft ||

            !data.age ||

            !data.phone ||

            !data.email ||

            !data.department ||

            !data.whyYou

        ) {

            return new Response(

                JSON.stringify({

                    success: false,

                    error:
                        "Missing required information."

                }),

                {

                    status: 400,

                    headers: {

                        "Content-Type":
                            "application/json"

                    }

                }

            );

        }


        /* WEBHOOK */

        const webhook =
            process.env.DISCORD_WEBHOOK;


        if (!webhook) {

            console.error(
                "DISCORD_WEBHOOK is missing."
            );


            return new Response(

                JSON.stringify({

                    success: false,

                    error:
                        "Server configuration error."

                }),

                {

                    status: 500,

                    headers: {

                        "Content-Type":
                            "application/json"

                    }

                }

            );

        }


        /* SAFE TEXT */

        function safe(value) {

            if (

                value === undefined ||

                value === null ||

                value === ""

            ) {

                return "N/A";

            }


            return String(value)
                .replace(
                    /@/g,
                    "@\u200b"
                );

        }


        /* EMBED */

        const embed = {

            title:
                "✦ MCNP STAFF APPLICATION ✦",

            description:
                "📥 A new staff application has been submitted.",

            color:
                0x5865F2,


            fields: [

                {

                    name:
                        "👤 Basic Information",

                    value:

                        `**Real Name:** ${safe(data.realName)}\n` +

                        `**Discord:** ${safe(data.discord)}\n` +

                        `**Minecraft:** ${safe(data.minecraft)}\n` +

                        `**Age:** ${safe(data.age)}\n` +

                        `**Contact:** ${safe(data.phone)}\n` +

                        `**Gmail:** ${safe(data.email)}\n` +

                        `**MCNP Member:** ${safe(data.membership)}`

                },


                {

                    name:
                        "🎯 Department",

                    value:
                        safe(data.department)

                },


                {

                    name:
                        "🎯 Department Reason",

                    value:
                        safe(
                            data.departmentReason
                        )

                },


                {

                    name:
                        "🧠 Experience & Skills",

                    value:

                        `**Previous Staff:** ${safe(data.previousStaff)}\n\n` +

                        `**Previous Experience:** ${safe(data.previousExperience)}\n\n` +

                        `**Skills:** ${safe(data.skills)}\n\n` +

                        `**Activity:** ${safe(data.activity)}`

                },


                {

                    name:
                        "🛡️ Situational Questions",

                    value:

                        `**Q14:** ${safe(data.situation1)}\n\n` +

                        `**Q15:** ${safe(data.situation2)}\n\n` +

                        `**Q16:** ${safe(data.situation3)}`

                },


                {

                    name:
                        "🛠️ Support Staff",

                    value:

                        `**Q17:** ${safe(data.support1)}\n\n` +

                        `**Q18:** ${safe(data.support2)}`

                },


                {

                    name:
                        "🎉 Event Staff",

                    value:

                        `**Q19:** ${safe(data.event1)}\n\n` +

                        `**Q20:** ${safe(data.event2)}`

                },


                {

                    name:
                        "📣 Marketing & Media",

                    value:

                        `**Q21:** ${safe(data.media1)}\n\n` +

                        `**Q22:** ${safe(data.media2)}`

                },


                {

                    name:
                        "⭐ Final Questions",

                    value:

                        `**Weekly Hours:** ${safe(data.hours)}\n\n` +

                        `**Why Select You:** ${safe(data.whyYou)}\n\n` +

                        `**Additional Information:** ${safe(data.anythingElse)}`

                }

            ],


            footer: {

                text:
                    "Minecraft Nepal • Staff Application"

            },


            timestamp:
                new Date().toISOString()

        };


        /* SEND TO DISCORD */

        const discordResponse =
            await fetch(

                webhook,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            username:
                                "MCNP Applications",

                            embeds:
                                [embed]

                        })

                }

            );


        if (
            !discordResponse.ok
        ) {

            console.error(
                await discordResponse.text()
            );

            throw new Error(
                "Discord webhook failed."
            );

        }


        /* SUCCESS */

        return new Response(

            JSON.stringify({

                success: true

            }),

            {

                status: 200,

                headers: {

                    "Content-Type":
                        "application/json"

                }

            }

        );


    } catch (error) {

        console.error(error);


        return new Response(

            JSON.stringify({

                success: false,

                error:
                    "Unable to submit application."

            }),

            {

                status: 500,

                headers: {

                    "Content-Type":
                        "application/json"

                }

            }

        );

    }

};
