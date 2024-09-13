var _a, _b, _c;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    // Retrieve form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Generate the resume output dynamically
    var resumeOutput = "\n        <h2>Resume</h2>\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">".concat(name, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n    ");
    // Insert the generated resume HTML into the resume output container
    var resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }
    // Make resume editable
    makeEditable();
});
(_b = document.getElementById("generateLink")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    // Retrieve form data
    var formData = new FormData(document.getElementById("resumeForm"));
    // Convert FormData to URLSearchParams
    var urlParams = new URLSearchParams();
    formData.forEach(function (value, key) {
        urlParams.append(key, value.toString());
    });
    // Construct the base URL
    var baseUrl = window.location.origin + window.location.pathname;
    var shareableUrl = "".concat(baseUrl, "?").concat(urlParams.toString());
    // Set the value of the shareable link input field
    document.getElementById("shareableLink").value = shareableUrl;
    // Update sharing links
    var encodedShareableUrl = encodeURIComponent(shareableUrl);
    document.getElementById("emailShare").href = "mailto:?subject=My Resume&body=".concat(encodedShareableUrl);
    document.getElementById("twitterShare").href = "https://twitter.com/intent/tweet?text=Check out my resume&url=".concat(encodedShareableUrl);
});
(_c = document.getElementById("downloadPDF")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    // Check if jsPDF is loaded
    if (window.jspdf) {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        // Get values from resume output
        var nameElement = document.getElementById("edit-name");
        var emailElement = document.getElementById("edit-email");
        var phoneElement = document.getElementById("edit-phone");
        var educationElement = document.getElementById("edit-education");
        var experienceElement = document.getElementById("edit-experience");
        var skillsElement = document.getElementById("edit-skills");
        if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
            var name_1 = nameElement.textContent || "";
            var email = emailElement.textContent || "";
            var phone = phoneElement.textContent || "";
            var education = educationElement.textContent || "";
            var experience = experienceElement.textContent || "";
            var skills = skillsElement.textContent || "";
            doc.setFontSize(18);
            doc.text("Resume", 10, 10);
            doc.setFontSize(12);
            doc.text("Name: ".concat(name_1), 10, 20);
            doc.text("Email: ".concat(email), 10, 30);
            doc.text("Phone: ".concat(phone), 10, 40);
            doc.text("Education", 10, 50);
            doc.text(education, 10, 60);
            doc.text("Experience", 10, 80);
            doc.text(experience, 10, 90);
            doc.text("Skills", 10, 110);
            doc.text(skills, 10, 120);
            // Save the PDF file
            doc.save("resume.pdf");
        }
        else {
            console.error("One or more elements for PDF generation not found.");
        }
    }
    else {
        console.error("jsPDF library not found.");
    }
});
// Populate form from URL query parameters
function populateFormFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("name"))
        document.getElementById("name").value = urlParams.get("name");
    if (urlParams.has("email"))
        document.getElementById("email").value = urlParams.get("email");
    if (urlParams.has("phone"))
        document.getElementById("phone").value = urlParams.get("phone");
    if (urlParams.has("education"))
        document.getElementById("education").value = urlParams.get("education");
    if (urlParams.has("experience"))
        document.getElementById("experience").value = urlParams.get("experience");
    if (urlParams.has("skills"))
        document.getElementById("skills").value = urlParams.get("skills");
}
// Call function to populate form with URL parameters if they exist
populateFormFromUrl();
// Make the resume fields editable
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var currentElement = element;
        });
    });
}
