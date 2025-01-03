async function sendFile() {
  const currentFile = document.querySelector('#fileInput').files[0];

  const formData = new FormData();
  formData.append('file', currentFile);

  const response = await fetch('/upload', {
    body: formData,
    method: 'POST',
  });

  console.log(response);
}

document.querySelector('#sendBtn').addEventListener('click', sendFile);
