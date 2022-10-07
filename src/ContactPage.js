import { useState } from "react";
import { PageBody } from "./util"

// Scaffold for content at /contact endpoint.
function ContactPage() {
    return (
        <div>
            <PageBody>
                <h1
                    className="contactHeader"
                >Contact</h1>
                <ContactForm />
            </PageBody>
        </div>
    )
}

function ContactForm() {
    let [submitText, setSubmitText] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        setSubmitText("Thanks for messaging!")
    }

    return (
        <div class="contactContainer">
            <div class="row">
                <div class="col align-self-center">
                    <h1 class="text-center">Email</h1>
                    {/* <!-- contact form --> */}
                    <form onSubmit={submitHandler}>
                        {/* <!-- email --> */}
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                id="email"
                                placeholder="enter your email"
                            />
                        </div>

                        {/* <!-- subject --> */}
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                class="form-control"
                                id="subject"
                                placeholder="enter email subject"
                            />
                        </div>

                        <div class="form-group">
                            <label for="email_body">Message</label>
                            <textarea
                                class="form-control"
                                style={{color: "gold"}}
                                id="email_body"
                                rows="5"
                                onChange={event => setSubmitText(event.target.value)}
                                value={submitText}
                            ></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;