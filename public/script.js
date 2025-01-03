async function sendFile(event) {
  const currentFile = event.target.files[0];

  const formData = new FormData();
  formData.append('file', currentFile);

  const response = await fetch('/upload', {
    body: formData,
    method: 'POST',
  });

  console.log(response);
}

document.querySelector('#fileInput').addEventListener('change', sendFile);
