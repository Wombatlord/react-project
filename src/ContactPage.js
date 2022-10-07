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
    /*
    This is the main component which composes the user input fields for a contact form.
    The submitHandler is attached to the <form> element.
    It prevents the default browser behaviour which is to refresh the page, this allows
    us to maintain state after submission. This is used to clear the email & subject fields,
    and to replace the user supplied message content with a string passed in setSubmitText.
    */
    let [emailField, setEmailField] = useState("");
    let [subjectField, setSubjectField] = useState("");
    let [submitText, setSubmitText] = useState("");

    const submitHandler = (event) => {
        // This prevents the page refreshing and losing state.
        // Allows useState hooks to change the user submitted content on submission.
        event.preventDefault();
        
        // Clear email & subject.
        setEmailField("");
        setSubjectField("");
        
        // Replace email body with passed string.
        setSubmitText("Thanks for messaging!");
    }

    return (
        <div class="contactContainer">
            <div class="row">
                <div class="col align-self-center">
                    <h1 class="text-center">Email JStone_Dev</h1>
                    {/* <!-- contact form --> */}
                    <form onSubmit={submitHandler}>
                        {/* <!-- email --> */}
                        <div class="form-group">
                            <label for="email" style={{font: "22px Major Mono Display, monospace"}}>Email address</label>
                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                id="email"
                                placeholder="enter your email"
                                onChange={event => setEmailField(event.target.value)}
                                value={emailField}
                                style={{color: "gold"}}
                            />
                        </div>

                        {/* <!-- subject --> */}
                        <div class="form-group">
                            <label for="subject" style={{font: "22px Major Mono Display, monospace"}}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                class="form-control"
                                id="subject"
                                placeholder="enter email subject"
                                onChange={event => setSubjectField(event.target.value)}
                                value={subjectField}
                                style={{color: "gold"}}
                            />
                        </div>

                        <div class="form-group">
                            <label for="email_body" style={{font: "22px Major Mono Display, monospace"}}>Message</label>
                            <textarea
                                class="form-control"
                                id="email_body"
                                rows="5"
                                onChange={event => setSubmitText(event.target.value)}
                                value={submitText}
                                style={{color: "gold"}}
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