# Audiophile eCommerce Web App

A modern, responsive eCommerce website for audio products (headphones, speakers, earphones) built with HTML, CSS, and JavaScript.

## Features

- **Homepage**: Hero section, featured products, category navigation, and about section.
- **Category Pages**: Dedicated pages for Headphones, Speakers, and Earphones, each with product grids and "Add to cart" functionality.
- **Product Images**: High-quality images for all products.
- **Cart System**:
  - Add/remove products from any category page.
  - Cart persists in localStorage until checkout is completed.
  - Quantity controls for each product in the cart.
  - Cart summary and checkout button.
- **Checkout**:
  - Checkout form with name, email, address, and payment method.
  - Order summary with product total, shipping, VAT, and grand total.
  - Order confirmation modal on successful checkout.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Modern UI**: Clean, accessible, and visually appealing layout.

## File Structure

```
├── index.html            # Homepage
├── headphones.html       # Headphones category page
├── speakers.html         # Speakers category page
├── earphones.html        # Earphones category page
├── cart.html             # Shopping cart page
├── checkout.html         # Checkout form and order confirmation
├── style.css             # Main stylesheet
├── js/
│   └── script.js         # Main JavaScript file
├── images/               # Product and UI images
│   └── ...
├── css/
│   └── style.css         # (Optional) Additional CSS
└── README.md             # Project documentation
```

## Getting Started

1. **Clone or Download** this repository.
2. **Open `index.html`** in your browser to view the homepage.
3. **Browse Products**: Navigate to category pages using the navigation bar or category cards.
4. **Add to Cart**: Click "Add to cart" on any product. The cart icon in the header links to the cart page.
5. **View Cart**: On `cart.html`, review your selected products, update quantities, or remove items.
6. **Checkout**: Click the checkout button to fill out the form and place your order. An order confirmation modal will appear.

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6+)

## Customization

- **Product Data**: Update product names, images, and prices in the HTML and `script.js` as needed.
- **Styling**: Modify `style.css` for branding or layout changes.
- **Images**: Replace images in the `images/` folder for your own products.

## Accessibility & Best Practices

- Semantic HTML structure
- Keyboard accessible navigation and forms
- Responsive and mobile-friendly design
- Clear focus states and color contrast

## Credits

- Product and UI icons from [Flaticon](https://www.flaticon.com/)
- Demo images are placeholders and should be replaced for production use.

## License

This project is for educational/demo purposes. Please replace images and product data before using commercially.
