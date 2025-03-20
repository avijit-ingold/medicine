import React, { useState, useContext } from "react";
import Layout from "./Layout";
import { GenericApiContext } from "../context/GenericApiContext";
import { toast } from "react-toastify";

const ContactUs = () => {
    const context = useContext(GenericApiContext);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {

        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        // Validation logic
        let newErrors = {};
        if (!data.name) newErrors.name = "Name is required";
        if (!data.subject) newErrors.subject = "Subject is required";
        if (!data.email) newErrors.email = "Email is required";
        if (!data.message) newErrors.message = "Message is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form Data:", data);
            context.setLoading(true)

            const obj = {
                "name": data.name,
                "email": data.email,
                "subject": data.subject,
                "message": data.message
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            fetch(`https://magentop3.ingold-dev.com/rest/V1/contactus `, requestOptions)
                .then(response => response.json())
                .then(data => {
                    toast.success('Form submitted successfully!', {
                        autoClose: 1100
                    });
                    context.setLoading(false)


                })


            event.target.reset(); // Reset form after submission
        }
    };

    return (
        <Layout>
            <div style={styles.container}>
                <h2 style={styles.heading}>WRITE US</h2>
                <p style={styles.description}>
                    Jot us a note and we'll get back to you as quickly as possible.
                </p>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Name *</label>
                        <input type="text" name="name" style={styles.input} />
                        {errors.name && <p style={styles.error}>{errors.name}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Subject *</label>
                        <input type="text" name="subject" style={styles.input} />
                        {errors.subject && <p style={styles.error}>{errors.subject}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email *</label>
                        <input type="email" name="email" style={styles.input} />
                        {errors.email && <p style={styles.error}>{errors.email}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>What's on your mind? *</label>
                        <textarea name="message" style={styles.textarea}></textarea>
                        {errors.message && <p style={styles.error}>{errors.message}</p>}
                    </div>

                    <button type="submit" style={styles.submitBtn}>SUBMIT</button>
                </form>
            </div>
        </Layout>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "117px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        textAlign: "center",
    },
    description: {
        textAlign: "center",
        color: "#555",
    },
    formGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    input: {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "3px",
    },
    textarea: {
        width: "100%",
        height: "100px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "3px",
    },
    submitBtn: {
        width: "100%",
        backgroundColor: "#6060d7",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
    },
};

export default ContactUs;
