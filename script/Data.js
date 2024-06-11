const productApiUrl = 'https://fakestoreapi.com/products';

async function fetchProducts() {
  try {
    const response = await fetch(productApiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // return []; 
  }
}

export default fetchProducts;