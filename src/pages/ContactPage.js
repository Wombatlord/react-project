import { useState, useRef } from "react";
import { PageBody } from "../components/PageBody";
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

function ContactForm() {
    /*
    ContactForm provides 3 fields for user input of a sending address, subject, and content.
    sendEmail() is the handler for onSubmit events, it is attached to the <form> element via the ref prop.
    The "name" prop in each <input> element corresponds to the dynamic variabls in an emailjs template. 
    ----
    These useState hooks allow for replacing user input after submission.
    They are attached to onChange props within their respective elements. */
    let [emailField, setEmailField] = useState("");
    let [subjectField, setSubjectField] = useState("");
    let [submitText, setSubmitText] = useState("");
    
    /*
    useRef hook allows form content to be passed into sendForm for processing by emailjs.
    It is attached to the form tag in the return statement. */
    const form = useRef();

    const sendEmail = (e) => {
        /* 
        This prevents the page refreshing and losing state.
        Allows useState hooks to change the user submitted content on submission. */
        e.preventDefault();

        // sendForm() is responsible for the actual sending of the form via emailjs.
        sendForm(
            process.env.REACT_APP_SERVICE_ID,  // emailjs service id.
            process.env.REACT_APP_TEMPLATE_ID, // emailjs template id.
            form.current,  // form content from ref prop via useRef hook.
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
                                    onChange={e => setEmailField(e.target.value)} // e.preventDefault in onSubmit handler allows field to be modified after submission.
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
                                    onChange={e => setSubjectField(e.target.value)} // e.preventDefault in onSubmit handler allows field to be modified after submission.
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
                                onChange={e => setSubmitText(e.target.value)} // e.preventDefault in onSubmit handler allows field to be modified after submission.
                                onFocus={() => setSubmitText("")} // Clear content if user refocuses field.
                                value={submitText}
                                style={{ color: "gold" }}
                                shadow="none"
                            ></textarea>
                        </div>
                        <div style={{ textAlign: "center", paddingBlock: "0.5em" }}> {/* button positioning */}
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ color: "gold", backgroundColor: "#212529", borderColor: "gold", width: "40%" }} // button styling
                            >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;