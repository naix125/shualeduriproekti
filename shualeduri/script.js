let likedProducts = [];  
let changedBrands = []; 


async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products/category/smartphones');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


async function loadProducts() {
  const products = await fetchProducts();

 
  const brands = products.map(product => product.brand);

 
  const uniqueBrands = [...new Set(brands)];

  
  changedBrands = [...uniqueBrands];


  console.log('Unique Brands:', uniqueBrands);

  
  const brandsContainer = document.getElementById('brands');
  

  brandsContainer.innerHTML = '';

 
  uniqueBrands.forEach(brand => {
    const brandDiv = document.createElement('div');  
    brandDiv.classList.add('nav-item');  

   
    const checkBox = document.createElement('div');
    checkBox.classList.add('checkbox'); 
    

    const checkMark = document.createElement('img');
    checkMark.src = '/images/check.svg'; 
    checkMark.alt = 'check';
    

    checkBox.appendChild(checkMark);   

    
    const brandText = document.createElement('span');
    brandText.textContent = brand;

    
    brandDiv.appendChild(checkBox);
    brandDiv.appendChild(brandText);
    
    
    brandsContainer.appendChild(brandDiv);

    
    checkBox.addEventListener('click', () => {
      
      if (checkMark.src.includes('uncheck.svg')) {
        checkMark.src = '/images/check.svg'; 
        changedBrands.push(brand); 
      } else {
        checkMark.src = '/images/uncheck.svg'; 
        changedBrands = changedBrands.filter(item => item !== brand); 
      }

      
      changedBrands = [...new Set(changedBrands)];
      console.log('Changed Brands:', changedBrands);

      
      updateProducts(products);
    });
  });

  
  updateProducts(products);
}


function updateProducts(products) {
  const filteredProducts = products.filter(product => changedBrands.includes(product.brand));

  const sortButton = document.getElementById('sortButton');

sortButton.addEventListener('click', () => {
  
  filteredProducts.sort((productA, productB) => productA.price - productB.price);

  


  
  updateProducts(filteredProducts);
});


  

  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = ''; 

  filteredProducts.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
   
    
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-container');

    
    const img = document.createElement('img');
    img.src = product.images[0];
    img.alt = product.title;
    img.classList.add('product-image');
    photoContainer.appendChild(img); 

    
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('bottom');

    
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left');

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    
    const price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = `$${product.price}`;
    priceContainer.appendChild(price);

    
    if (product.discountPercentage && product.discountPercentage > 0) {
      const oldPrice = document.createElement('p');
      oldPrice.classList.add('product-old-price');
      const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
      oldPrice.textContent = `$${originalPrice}`;
      priceContainer.appendChild(oldPrice);
    }

    
    leftContainer.appendChild(priceContainer);

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('product-rating');
    const roundedRating = Math.round(product.rating);

    
    for (let i = 0; i < 5; i++) { 
      const star = document.createElement('img'); 
    
      
      if (i < roundedRating) {
        star.src = '/images/gold-star.svg'; 
        star.alt = 'Gold star'; 
      } else {
        star.src = '/images/gray-star.svg'; 
        star.alt = 'Gray star'; 
      }
      
      star.classList.add('star-icon'); 
      ratingContainer.appendChild(star); 
    }

    const ratingText = document.createElement('span');
    ratingText.textContent = product.rating;
    ratingText.classList.add('rating-text');
    ratingContainer.appendChild(ratingText);
    
    leftContainer.appendChild(ratingContainer);

    const productName = document.createElement('p');
    productName.classList.add('product-title'); 
    productName.textContent = product.title;    
    leftContainer.appendChild(productName); 

    
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right');

    
    const likeButton = document.createElement('div');
    likeButton.classList.add('like-button');
    const heartIcon = document.createElement('img');
    heartIcon.src = '/images/heart.svg'; 
    heartIcon.alt = 'Heart icon';
    heartIcon.classList.add('heart-icon');
    likeButton.appendChild(heartIcon);

    likeButton.addEventListener('click', () => {
      if (likedProducts.includes(product.title)) {
        likedProducts = likedProducts.filter(item => item !== product.title);
        console.log(`Removed from liked: ${product.title}`);
        heartIcon.src = '/images/heart.svg';
      } else {
        likedProducts.push(product.title);
        console.log(`Added to liked: ${product.title}`);
        heartIcon.src = '/images/likedheart.svg';
      }
      console.log('Liked products:', likedProducts);
    });

    rightContainer.appendChild(likeButton);

    bottomContainer.appendChild(leftContainer);
    bottomContainer.appendChild(rightContainer);

    productCard.appendChild(photoContainer);
    productCard.appendChild(bottomContainer);

    productsContainer.appendChild(productCard);
  });
}


window.onload = loadProducts;

const categoryBlocks = document.querySelectorAll('.category');

categoryBlocks.forEach(categoryBlock => {
    
    const categoryTitle = categoryBlock.querySelector('.category-title');

    categoryTitle.addEventListener('click', function (event) {
        
        categoryBlock.classList.toggle('open');

        
        event.stopPropagation();
    });
  });