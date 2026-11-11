const form = document.getElementById("userForm");
const result = document.getElementById("result");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const file = formData.get("file");

  const video = formData.get("video");

  const audio = formData.get("audio");

  const userData = {
    name: formData.get("name"),
    age: formData.get("age"),
    date: formData.get("date"),

    file:
      file && file.name
        ? {
            name: file.name,
            type: file.type,
            size: file.size,
          }
        : null,

    video:
      video && video.name
        ? {
            name: video.name,
            type: video.type,
            size: video.size,
          }
        : null,

    audio:
      audio && audio.name
        ? {
            name: audio.name,
            type: audio.type,
            size: audio.size,
          }
        : null,
  };

  const userDataJSON = JSON.stringify(userData);

  localStorage.setItem("userData", userDataJSON);

  result.innerHTML = `
  <h3>User Details</h3>
  <p>Name: ${formData.get("name")}</p>
  <p>Age: ${formData.get("age")}</p>
  <p>Date: ${formData.get("date")}</p>
`;

  const fileName = document.createElement("p");

  fileName.textContent = file ? `File: ${file.name}` : "No file selected";

  result.appendChild(fileName);

  const videoName = document.createElement("p");

  videoName.textContent =
    video && video.name ? `Video: ${video.name}` : "No video selected";

  result.appendChild(videoName);

  const audioName = document.createElement("p");

  audioName.textContent =
    audio && audio.name ? `Audio: ${audio.name}` : "No audio selected";

  result.appendChild(audioName);
});

const savedData = localStorage.getItem("userData");

if (savedData) {
  const parsedData = JSON.parse(savedData);

  result.innerHTML = `
  <h3>Saved User Details</h3>
  <p>Name: ${parsedData.name}</p>
  <p>Age: ${parsedData.age}</p>
  <p>Date: ${parsedData.date}</p>
  <p>File: ${parsedData.file ? parsedData.file.name : "No file selected"}</p>
  <p>Video: ${parsedData.video ? parsedData.video.name : "No video selected"}</p>
  <p>Audio: ${parsedData.audio ? parsedData.audio.name : "No audio selected"}</p>
`;

  document.getElementById("name").value = parsedData.name;
  document.getElementById("age").value = parsedData.age;
  document.getElementById("date").value = parsedData.date;

  console.log(parsedData);
}
