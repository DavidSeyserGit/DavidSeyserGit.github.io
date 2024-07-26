document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("project");

  fetch("scripts/project-details.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (projectId && data[projectId]) {
        const project = data[projectId];
        document.getElementById("project-title").innerText = project.name;
        document.getElementById("project-description").innerText =
          project.description;
        document.getElementById("project-long-description").innerText =
          project.longDescription;
        document.getElementById("project-link").href = project.link;

        // Handle multiple images
        const imagesContainer = document.getElementById("project-images");
        project.images.forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = project.name;
          img.classList.add("project-image");
          imagesContainer.appendChild(img);
        });

        // Handle extra links
        if (project.extraLinks && project.extraLinks.length > 0) {
          const extraLinksContainer = document.getElementById("extra-links");
          project.extraLinks.forEach((link) => {
            const a = document.createElement("a");
            a.href = link.url;
            a.innerText = link.text;
            a.target = "_blank";
            extraLinksContainer.appendChild(a);
          });
        }
      } else {
        document.querySelector(".content").innerHTML =
          "<p>Error: Project details are missing.</p>";
      }
    })
    .catch((error) => {
      document.querySelector(".content").innerHTML =
        "<p>Error loading project details.</p>";
      console.error("Error fetching project details:", error);
    });
});
