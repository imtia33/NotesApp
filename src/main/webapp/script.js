document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileList = document.getElementById('files');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                alert('File uploaded successfully!');
                uploadForm.reset();
                fetchFiles();
            } else {
                alert('File upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
        }
    });

    async function fetchFiles() {
        try {
            const response = await fetch('/files');
            const files = await response.json();
            
            fileList.innerHTML = '';
            files.forEach(file => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="/download/${file.filename}" download>${file.originalName} (Uploaded by: ${file.uploadedBy})</a>`;
                fileList.appendChild(li);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching the file list.');
        }
    }

    fetchFiles();
});