export class FormHandler {
    initFormHandler = () => {
        const form = document.querySelector('form[name="contact"]');

        if (!form) return;
        form.addEventListener("submit", this.formHandler);
    }

    formHandler = async (event) => {
        event.preventDefault();

        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };


        const { name, email, message } = formData;
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert("Please fill out all fields.");
            return;
        }


        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Submission failed with status " + res.status);

            alert("Message sent successfully!");
            form.reset();
        } catch (error) {
            alert("There was an error sending your message. Please try again later.");
            console.error("Form submission error:", error);
        } finally {
            submitBtn.disabled = false;
        }
    }
}
