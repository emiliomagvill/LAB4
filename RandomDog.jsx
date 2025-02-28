import React, { useState, useEffect } from 'react';

function RandomDogImage() {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setImageUrl(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div>
      <h1>Imagen Aleatoria de Perro</h1>
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {imageUrl && <img src={imageUrl} alt="Un perro aleatorio" style={{ maxWidth: '100%', height: 'auto' }} />}
      <button onClick={fetchDogImage}>Obtener otra imagen</button>
    </div>
  );
}

export default RandomDogImage;