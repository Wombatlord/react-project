import { useState, useRef } from "react";
import { PageBody } from "./util";
import { sendForm } from "emailjs-com";

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

//https://dev.to/ebereplenty/contact-form-with-emailjs-react-581c

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

    const form = useRef();

    const sendEmail = (e) => {
        // This prevents the page refreshing and losing state.
        // Allows useState hooks to change the user submitted content on submission.
        e.preventDefault();

        // This function is responsible for the actual sending of the form via emailjs.
        // 
        sendForm(
            process.env.REACT_APP_SERVICE_ID,  // emailjs service id.
            process.env.REACT_APP_TEMPLATE_ID, // emailjs template id.
            form.current,  // form content.
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY // emailjs public key.
        )
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        // Clear email & subject.
        setEmailField("");
        setSubjectField("");

        // Replace email body with passed string.
        setSubmitText("Thanks for messaging!");
    };

    return (
        <div className="contactContainer">
            <div className="row">
                <div className="col align-self-center">
                    <h1 className="text-center">Email JStone_Dev</h1>
                    {/* <!-- contact form --> */}
                    <form ref={form} onSubmit={sendEmail}>
                        {/* <!-- sender's email address --> */}
                        <div className="form-group">
                            {/* <label for="email" style={{font: "22px Major Mono Display, monospace", paddingBlock: "0.5em"}}>Email address</label> */}
                            <div style={{ minHeight: "50px" }}>
                                <input
                                    type="email"
                                    name="jsdev_email"
                                    className="form-control"
                                    id="email"
                                    placeholder="enter your email"
                                    onChange={event => setEmailField(event.target.value)}
                                    value={emailField}
                                    style={{ color: "gold" }}
                                />
                            </div>
                        </div>

                        {/* <!-- subject field --> */}
                        <div className="form-group">
                            {/* <label for="subject" style={{font: "22px Major Mono Display, monospace", paddingBlock: "0.5em"}}>Subject</label> */}
                            <div style={{ minHeight: "50px" }}>
                                <input
                                    type="text"
                                    name="jsdev_subject"
                                    className="form-control"
                                    id="subject"
                                    placeholder="enter email subject"
                                    onChange={event => setSubjectField(event.target.value)}
                                    value={subjectField}
                                    style={{ color: "gold" }}
                                />
                            </div>
                        </div>

                        {/* <!-- message content field --> */}
                        <div className="form-group" style={{ paddingBlockEnd: "0.5em" }}>
                            {/* <label for="email_body" style={{font: "22px Major Mono Display, monospace", paddingBlock: "0.5em", paddingInline: "2em"}}>Message</label> */}
                            <textarea
                                className="form-control"
                                name="jsdev_message"
                                rows="5"
                                onChange={event => setSubmitText(event.target.value)}
                                onFocus={() => setSubmitText("")}
                                value={submitText}
                                style={{ color: "gold" }}
                                shadow="none"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ color: "gold", backgroundColor: "#212529", borderColor: "gold" }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;