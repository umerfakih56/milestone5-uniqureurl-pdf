document.getElementById("resumeForm")?.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    // Retrieve form values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    // Generate the resume output dynamically
    const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>
        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>
        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
    `;

    // Insert the generated resume HTML into the resume output container
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }

    // Make resume editable
    makeEditable();
});

document.getElementById("generateLink")?.addEventListener("click", function () {
    // Retrieve form data
    const formData = new FormData(document.getElementById("resumeForm") as HTMLFormElement);

    // Convert FormData to URLSearchParams
    const urlParams = new URLSearchParams();
    formData.forEach((value, key) => {
        urlParams.append(key, value.toString());
    });

    // Construct the base URL
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}?${urlParams.toString()}`;

    // Set the value of the shareable link input field
    (document.getElementById("shareableLink") as HTMLInputElement).value = shareableUrl;

    // Update sharing links
    const encodedShareableUrl = encodeURIComponent(shareableUrl);
    document.getElementById("emailShare")!.href = `mailto:?subject=My Resume&body=${encodedShareableUrl}`;
    document.getElementById("twitterShare")!.href = `https://twitter.com/intent/tweet?text=Check out my resume&url=${encodedShareableUrl}`;
});

document.getElementById("downloadPDF")?.addEventListener("click", function () {
    // Check if jsPDF is loaded
    if (window.jspdf) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Get values from resume output
        const nameElement = document.getElementById("edit-name") as HTMLElement;
        const emailElement = document.getElementById("edit-email") as HTMLElement;
        const phoneElement = document.getElementById("edit-phone") as HTMLElement;
        const educationElement = document.getElementById("edit-education") as HTMLElement;
        const experienceElement = document.getElementById("edit-experience") as HTMLElement;
        const skillsElement = document.getElementById("edit-skills") as HTMLElement;

        if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
            const name = nameElement.textContent || "";
            const email = emailElement.textContent || "";
            const phone = phoneElement.textContent || "";
            const education = educationElement.textContent || "";
            const experience = experienceElement.textContent || "";
            const skills = skillsElement.textContent || "";

            doc.setFontSize(18);
            doc.text("Resume", 10, 10);
            doc.setFontSize(12);
            doc.text(`Name: ${name}`, 10, 20);
            doc.text(`Email: ${email}`, 10, 30);
            doc.text(`Phone: ${phone}`, 10, 40);
            doc.text("Education", 10, 50);
            doc.text(education, 10, 60);
            doc.text("Experience", 10, 80);
            doc.text(experience, 10, 90);
            doc.text("Skills", 10, 110);
            doc.text(skills, 10, 120);

            // Save the PDF file
            doc.save("resume.pdf");
        } else {
            console.error("One or more elements for PDF generation not found.");
        }
    } else {
        console.error("jsPDF library not found.");
    }
});

// Populate form from URL query parameters
function populateFormFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("name")) (document.getElementById("name") as HTMLInputElement).value = urlParams.get("name")!;
    if (urlParams.has("email")) (document.getElementById("email") as HTMLInputElement).value = urlParams.get("email")!;
    if (urlParams.has("phone")) (document.getElementById("phone") as HTMLInputElement).value = urlParams.get("phone")!;
    if (urlParams.has("education")) (document.getElementById("education") as HTMLTextAreaElement).value = urlParams.get("education")!;
    if (urlParams.has("experience")) (document.getElementById("experience") as HTMLTextAreaElement).value = urlParams.get("experience")!;
    if (urlParams.has("skills")) (document.getElementById("skills") as HTMLTextAreaElement).value = urlParams.get("skills")!;
}

// Call function to populate form with URL parameters if they exist
populateFormFromUrl();

// Make the resume fields editable
function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");

    editableElements.forEach(element => {
        element.addEventListener("click", function () {
            const currentElement = element as HTMLElement;
