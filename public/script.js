const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', sendFile);

async function sendFile(event) {
  const currentFile = event.target.files[0];

  const formData = new FormData();
  formData.append('file', currentFile);

  const response = await fetch('/upload', {
    body: {
      test: 'test',
    },
    method: 'POST',
  });

  console.log(response);
}
