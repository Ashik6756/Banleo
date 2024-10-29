document.getElementById('removeBgBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageUpload');
    if (!fileInput.files[0]) {
        alert('Будь ласка, виберіть зображення.');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': '<uhrikoaM3QPBHoJZicSMsKKv>', // Вставте сюди ваш API ключ
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Сталася помилка при видаленні фону: ' + response.statusText);
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
    } catch (error) {
        alert(error.message);
    }
});

