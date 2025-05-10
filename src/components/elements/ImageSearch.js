import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const ImageSearchContainer = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #eee;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const SearchButton = styled.button`
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  
  &:hover {
    background-color: #1976D2;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: white;
`;

const ImageResult = styled.div`
  position: relative;
  cursor: grab;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  &:active {
    cursor: grabbing;
  }
  
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  padding: 10px;
  text-align: center;
  font-size: 14px;
`;

// Unsplash API for external image search with user's credentials
const UNSPLASH_ACCESS_KEY = '8haQnxIBDOeXN05iYRFf44Vh5e71xDXtW9zy5ib6g9w';

// Backup sample images in case the API fails
const sampleImages = [
  {
    id: 'sample1',
    urls: {
      small: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      regular: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    alt_description: 'lion mane'
  },
  {
    id: 'sample2',
    urls: {
      small: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      regular: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    alt_description: 'nature landscape'
  },
  {
    id: 'sample3',
    urls: {
      small: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      regular: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    alt_description: 'modern architecture'
  },
  {
    id: 'sample4',
    urls: {
      small: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      regular: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    alt_description: 'coding on laptop'
  }
];

const ImageSearch = () => {
  const { addElement } = useBuilderContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // For demo purposes, we'll use a set of sample images with actual URLs
  const sampleImages = [
    { id: 'sample1', urls: { small: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=300&h=200&fit=crop' }, alt_description: 'Beautiful mountains with lake' },
    { id: 'sample2', urls: { small: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=200&fit=crop' }, alt_description: 'City skyline at night' },
    { id: 'sample3', urls: { small: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=200&fit=crop' }, alt_description: 'Dog with funny expression' },
    { id: 'sample4', urls: { small: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop' }, alt_description: 'Food plate with vegetables' },
    { id: 'sample5', urls: { small: 'https://images.unsplash.com/photo-1579170053380-58828eec8b42?w=300&h=200&fit=crop' }, alt_description: 'Colorful flowers' },
    { id: 'sample6', urls: { small: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=300&h=200&fit=crop' }, alt_description: 'Modern office interior' },
  ];
  
  useEffect(() => {
    // Initialize with sample images
    setResults(sampleImages);
  }, []);
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Make a real API call to Unsplash to search for images
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        }
      );
      
      if (!response.ok) {
        console.error(`API response not OK: Status ${response.status}`);
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // If we got results from the API, use them
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        // If no results, show a message and fall back to sample images
        setError('No images found for your search. Try a different term.');
        setResults(sampleImages);
      }
    } catch (err) {
      console.error('Error searching for images:', err);
      
      // Provide more specific error message based on the error
      if (err.message.includes('API error: 401') || err.message.includes('API error: 403')) {
        setError('API authentication error. Using sample images instead.');
      } else if (err.message.includes('API error: 429')) {
        setError('Too many requests to the image service. Using sample images instead.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Failed to load images from external source. Using sample images instead.');
      }
      
      // Fall back to sample images when there's an error
      setResults(sampleImages);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleDragStart = (e, image) => {
    // Set the drag data with the image information
    const elementData = {
      type: 'image',
      id: `image-${Date.now()}`,
      content: image.urls.small,
      properties: {
        width: '300px',
        height: '200px',
        alt: image.alt_description || 'Image'
      }
    };
    
    e.dataTransfer.setData('text/plain', JSON.stringify(elementData));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create a drag image
    const dragImage = document.createElement('img');
    dragImage.src = image.urls.small;
    dragImage.style.width = '100px';
    dragImage.style.height = '75px';
    dragImage.style.objectFit = 'cover';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 50, 37);
    
    // Clean up the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 100);
  };
  
  return (
    <ImageSearchContainer>
      <h4>Search Images</h4>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <SearchInput
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <SearchButton onClick={handleSearch} disabled={loading || !query.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </SearchButton>
      
      {loading ? (
        <LoadingIndicator>Loading images...</LoadingIndicator>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <ResultsContainer>
          {results.map(image => (
            <ImageResult 
              key={image.id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image)}
            >
              <img src={image.urls.small} alt={image.alt_description || 'Image'} />
            </ImageResult>
          ))}
        </ResultsContainer>
      )}
    </ImageSearchContainer>
  );
};

export default ImageSearch;
