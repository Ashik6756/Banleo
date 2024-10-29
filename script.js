document.getElementById('removeBgBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageUpload');
    if (!fileInput.files[0]) {
        alert('Будь ласка, виберіть зображення.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    // Заміни <YOUR_API_ENDPOINT> на реальний URL API для видалення фону
    const response = await fetch('<YOUR_API_ENDPOINT>', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        alert('Сталася помилка при видаленні фону.');
        return;
    }

    const blob = await response.blob();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);

    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };
});
