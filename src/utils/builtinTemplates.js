/**
 * Built-in website templates for quick start
 */

// Business website template styled like BizPulse
export const businessTemplate = {
  name: 'Business Magazine',
  description: 'A modern business magazine template with clean layout and professional styling.',
  elements: [
    // Header Section
    {
      id: 'heading-header',
      type: 'heading',
      content: 'BizPulse',
      position: { x: 20, y: 20 },
      properties: {
        fontSize: '36px',
        color: '#111111',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '200px',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: '1px'
      }
    },
    // Navigation Bar
    {
      id: 'text-nav-1',
      type: 'text',
      content: 'Home',
      position: { x: 20, y: 80 },
      properties: {
        fontSize: '16px',
        color: '#111111',
        fontWeight: 'bold',
        marginRight: '25px',
        display: 'inline-block',
        cursor: 'pointer'
      }
    },
    {
      id: 'text-nav-2',
      type: 'text',
      content: 'Finances',
      position: { x: 100, y: 80 },
      properties: {
        fontSize: '16px',
        color: '#111111',
        fontWeight: 'bold',
        marginRight: '25px',
        display: 'inline-block',
        cursor: 'pointer'
      }
    },
    {
      id: 'text-nav-3',
      type: 'text',
      content: 'Technology',
      position: { x: 200, y: 80 },
      properties: {
        fontSize: '16px',
        color: '#111111',
        fontWeight: 'bold',
        marginRight: '25px',
        display: 'inline-block',
        cursor: 'pointer'
      }
    },
    {
      id: 'text-nav-4',
      type: 'text',
      content: 'Startups',
      position: { x: 310, y: 80 },
      properties: {
        fontSize: '16px',
        color: '#111111',
        fontWeight: 'bold',
        marginRight: '25px',
        display: 'inline-block',
        cursor: 'pointer'
      }
    },
    {
      id: 'text-nav-5',
      type: 'text',
      content: 'About',
      position: { x: 400, y: 80 },
      properties: {
        fontSize: '16px',
        color: '#111111',
        fontWeight: 'bold',
        marginRight: '25px',
        display: 'inline-block',
        cursor: 'pointer'
      }
    },
    {
      id: 'text-nav-6',
      type: 'text',
      content: 'Contact',
      position: { x: 470, y: 80 },
      properties: {
        fontSize: '16px',
        color: '#111111',
        fontWeight: 'bold',
        display: 'inline-block',
        cursor: 'pointer'
      }
    },
    // Featured Article Section
    {
      id: 'image-featured',
      type: 'image',
      content: 'https://picsum.photos/800/400?random=1',
      position: { x: 20, y: 130 },
      properties: {
        width: '800px',
        height: 'auto',
        marginBottom: '15px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        alt: 'Featured Article'
      }
    },
    {
      id: 'text-category',
      type: 'text',
      content: 'TECHNOLOGY',
      position: { x: 20, y: 550 },
      properties: {
        fontSize: '14px',
        color: '#e74c3c',
        fontWeight: 'bold',
        marginBottom: '10px',
        letterSpacing: '1px',
        display: 'block'
      }
    },
    {
      id: 'heading-featured',
      type: 'heading',
      content: 'Exploring how artificial intelligence is reshaping corporate strategy in 2025',
      position: { x: 20, y: 580 },
      properties: {
        fontSize: '28px',
        color: '#333333',
        fontWeight: 'bold',
        lineHeight: '1.3',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
        width: '800px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'text-author',
      type: 'text',
      content: 'By John Smith • March 18, 2025',
      position: { x: 20, y: 650 },
      properties: {
        fontSize: '14px',
        color: '#666666',
        marginBottom: '20px',
        width: '300px',
        height: 'auto',
        display: 'block'
      }
    },
    // Trending Topics Section
    {
      id: 'heading-trending',
      type: 'heading',
      content: 'Trending Topics',
      position: { x: 20, y: 700 },
      properties: {
        fontSize: '22px',
        color: '#111111',
        fontWeight: 'bold',
        marginBottom: '20px',
        borderBottom: '2px solid #e74c3c',
        paddingBottom: '10px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    // First Article Card
    {
      id: 'image-article1',
      type: 'image',
      content: 'https://picsum.photos/300/200?random=2',
      position: { x: 20, y: 760 },
      properties: {
        width: '300px',
        height: 'auto',
        borderRadius: '4px',
        marginBottom: '15px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        alt: 'Article 1'
      }
    },
    {
      id: 'text-category1',
      type: 'text',
      content: 'ECONOMICS',
      position: { x: 20, y: 980 },
      properties: {
        fontSize: '12px',
        color: '#e74c3c',
        fontWeight: 'bold',
        marginBottom: '5px',
        letterSpacing: '1px'
      }
    },
    {
      id: 'heading-article1',
      type: 'heading',
      content: 'Global Economic Outlook: Predictions for 2025',
      position: { x: 20, y: 1005 },
      properties: {
        fontSize: '18px',
        color: '#111111',
        fontWeight: 'bold',
        marginBottom: '10px',
        maxWidth: '300px',
        lineHeight: '1.3'
      }
    },
    // Second Article Card
    {
      id: 'image-article2',
      type: 'image',
      content: 'https://picsum.photos/300/200?random=3',
      position: { x: 350, y: 760 },
      properties: {
        width: '300px',
        height: 'auto',
        borderRadius: '4px',
        marginBottom: '15px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        alt: 'Article 2'
      }
    },
    {
      id: 'text-category2',
      type: 'text',
      content: 'STARTUPS',
      position: { x: 350, y: 980 },
      properties: {
        fontSize: '12px',
        color: '#e74c3c',
        fontWeight: 'bold',
        marginBottom: '5px',
        letterSpacing: '1px'
      }
    },
    {
      id: 'heading-article2',
      type: 'heading',
      content: 'Top Startup Trends to Watch in the Coming Year',
      position: { x: 350, y: 1005 },
      properties: {
        fontSize: '18px',
        color: '#111111',
        fontWeight: 'bold',
        marginBottom: '10px',
        maxWidth: '300px',
        lineHeight: '1.3'
      }
    },
    // Newsletter Section
    {
      id: 'heading-newsletter',
      type: 'heading',
      content: 'Subscribe to Our Newsletter',
      position: { x: 20, y: 1100 },
      properties: {
        fontSize: '22px',
        color: '#111111',
        fontWeight: 'bold',
        marginBottom: '15px'
      }
    },
    {
      id: 'paragraph-newsletter',
      type: 'paragraph',
      content: 'Stay updated with the latest business news, market trends, and expert insights delivered directly to your inbox.',
      position: { x: 20, y: 1140 },
      properties: {
        fontSize: '16px',
        color: '#666666',
        lineHeight: '1.6',
        marginBottom: '20px',
        maxWidth: '600px'
      }
    },
    {
      id: 'button-subscribe',
      type: 'button',
      content: 'Subscribe Now',
      position: { x: 20, y: 1200 },
      properties: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '4px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }
    },
    // Footer Section
    {
      id: 'footer-background',
      type: 'text',
      content: '',
      position: { x: 0, y: 1300 },
      properties: {
        width: '1280px', // Fixed width to match canvas width
        height: '300px',
        backgroundColor: '#111111',
        padding: '40px 0',
        display: 'block',
        left: '0',
        right: '0',
        boxSizing: 'border-box'
      }
    },
    {
      id: 'footer-logo',
      type: 'heading',
      content: 'BizPulse',
      position: { x: 20, y: 1320 },
      properties: {
        fontSize: '28px',
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: '1px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-description',
      type: 'paragraph',
      content: 'Your trusted source for business news, insights, and analysis. Covering finance, technology, startups, and more.',
      position: { x: 20, y: 1360 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        lineHeight: '1.6',
        marginBottom: '30px',
        width: '350px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-heading-links',
      type: 'heading',
      content: 'Quick Links',
      position: { x: 300, y: 1320 },
      properties: {
        fontSize: '18px',
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: '15px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-link-1',
      type: 'text',
      content: 'About Us',
      position: { x: 300, y: 1360 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-link-2',
      type: 'text',
      content: 'Contact',
      position: { x: 300, y: 1385 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-link-3',
      type: 'text',
      content: 'Privacy Policy',
      position: { x: 300, y: 1410 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-link-4',
      type: 'text',
      content: 'Terms of Service',
      position: { x: 300, y: 1435 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-heading-categories',
      type: 'heading',
      content: 'Categories',
      position: { x: 600, y: 1320 },
      properties: {
        fontSize: '18px',
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: '15px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-category-1',
      type: 'text',
      content: 'Technology',
      position: { x: 600, y: 1360 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-category-2',
      type: 'text',
      content: 'Finance',
      position: { x: 600, y: 1385 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-category-3',
      type: 'text',
      content: 'Startups',
      position: { x: 600, y: 1410 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'footer-category-4',
      type: 'text',
      content: 'Leadership',
      position: { x: 600, y: 1435 },
      properties: {
        fontSize: '14px',
        color: '#e0e0e0',
        marginBottom: '10px',
        cursor: 'pointer'
      }
    },
    {
      id: 'footer-copyright',
      type: 'text',
      content: '© 2025 BizPulse. All rights reserved.',
      position: { x: 20, y: 1520 },
      properties: {
        fontSize: '14px',
        color: '#aaaaaa',
        marginTop: '30px'
      }
    }
  ]
};

// Portfolio template
export const portfolioTemplate = {
  name: 'Portfolio Website',
  description: 'Showcase your work with this elegant portfolio template.',
  elements: [
    {
      id: 'heading-name',
      type: 'heading',
      content: 'Your Name',
      position: { x: 20, y: 20 },
      properties: {
        fontSize: '36px',
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        marginBottom: '10px'
      }
    },
    {
      id: 'text-profession',
      type: 'text',
      content: 'Designer & Developer',
      position: { x: 20, y: 80 },
      properties: {
        fontSize: '18px',
        color: '#7f8c8d',
        fontWeight: 'normal',
        textAlign: 'center',
        width: '100%',
        marginBottom: '40px'
      }
    },
    {
      id: 'image-profile',
      type: 'image',
      content: 'https://picsum.photos/200/200',
      position: { x: 220, y: 130 },
      properties: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '5px solid #3498db',
        marginBottom: '40px',
        alt: 'Profile Picture'
      }
    },
    {
      id: 'heading-about',
      type: 'heading',
      content: 'About Me',
      position: { x: 20, y: 380 },
      properties: {
        fontSize: '24px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px'
      }
    },
    {
      id: 'paragraph-about',
      type: 'paragraph',
      content: 'I am a passionate designer and developer with over 5 years of experience creating beautiful and functional websites and applications.',
      position: { x: 20, y: 430 },
      properties: {
        fontSize: '16px',
        color: '#34495e',
        lineHeight: '1.6',
        marginBottom: '30px',
        maxWidth: '600px'
      }
    },
    {
      id: 'heading-portfolio',
      type: 'heading',
      content: 'My Work',
      position: { x: 20, y: 520 },
      properties: {
        fontSize: '24px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px'
      }
    },
    {
      id: 'image-work1',
      type: 'image',
      content: 'https://picsum.photos/280/180?random=1',
      position: { x: 20, y: 570 },
      properties: {
        width: '280px',
        height: '180px',
        borderRadius: '8px',
        marginRight: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        alt: 'Project 1'
      }
    },
    {
      id: 'image-work2',
      type: 'image',
      content: 'https://picsum.photos/280/180?random=2',
      position: { x: 320, y: 570 },
      properties: {
        width: '280px',
        height: '180px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        alt: 'Project 2'
      }
    },
    {
      id: 'button-contact',
      type: 'button',
      content: 'Contact Me',
      position: { x: 20, y: 780 },
      properties: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '4px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }
    }
  ]
};

// Blog template
export const blogTemplate = {
  name: 'Blog Website',
  description: 'A clean and modern blog template with featured posts and sidebar.',
  elements: [
    {
      id: 'heading-blog-name',
      type: 'heading',
      content: 'My Blog',
      position: { x: 20, y: 20 },
      properties: {
        fontSize: '32px',
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        marginBottom: '10px'
      }
    },
    {
      id: 'text-blog-description',
      type: 'text',
      content: 'Thoughts, stories and ideas',
      position: { x: 20, y: 70 },
      properties: {
        fontSize: '18px',
        color: '#7f8c8d',
        fontWeight: 'normal',
        textAlign: 'center',
        width: '100%',
        marginBottom: '40px'
      }
    },
    {
      id: 'heading-featured',
      type: 'heading',
      content: 'Featured Post',
      position: { x: 20, y: 130 },
      properties: {
        fontSize: '24px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px'
      }
    },
    {
      id: 'image-featured',
      type: 'image',
      content: 'https://picsum.photos/600/300?random=3',
      position: { x: 20, y: 180 },
      properties: {
        width: '600px',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        alt: 'Featured Post'
      }
    },
    {
      id: 'heading-post-title',
      type: 'heading',
      content: 'How to Create a Stunning Website',
      position: { x: 20, y: 510 },
      properties: {
        fontSize: '22px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '15px'
      }
    },
    {
      id: 'paragraph-post-excerpt',
      type: 'paragraph',
      content: 'Learn the essential tips and tricks to create a beautiful and functional website that will impress your visitors and achieve your goals.',
      position: { x: 20, y: 560 },
      properties: {
        fontSize: '16px',
        color: '#34495e',
        lineHeight: '1.6',
        marginBottom: '20px',
        maxWidth: '600px'
      }
    },
    {
      id: 'button-read-more',
      type: 'button',
      content: 'Read More',
      position: { x: 20, y: 640 },
      properties: {
        backgroundColor: '#9b59b6',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }
    },
    {
      id: 'heading-recent-posts',
      type: 'heading',
      content: 'Recent Posts',
      position: { x: 20, y: 700 },
      properties: {
        fontSize: '24px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px'
      }
    },
    {
      id: 'text-post1',
      type: 'text',
      content: '10 Web Design Trends in 2025',
      position: { x: 20, y: 750 },
      properties: {
        fontSize: '18px',
        color: '#3498db',
        fontWeight: 'bold',
        marginBottom: '10px',
        cursor: 'pointer',
        textDecoration: 'none'
      }
    },
    {
      id: 'text-post2',
      type: 'text',
      content: 'The Ultimate Guide to Content Marketing',
      position: { x: 20, y: 790 },
      properties: {
        fontSize: '18px',
        color: '#3498db',
        fontWeight: 'bold',
        marginBottom: '10px',
        cursor: 'pointer',
        textDecoration: 'none'
      }
    }
  ]
};

// E-commerce template
export const ecommerceTemplate = {
  name: 'E-commerce Website',
  description: 'A template for online stores with product showcases and call-to-action buttons.',
  elements: [
    {
      id: 'heading-store-name',
      type: 'heading',
      content: 'Your Store Name',
      position: { x: 20, y: 20 },
      properties: {
        fontSize: '32px',
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '800px',
        marginBottom: '10px'
      }
    },
    {
      id: 'text-store-tagline',
      type: 'text',
      content: 'Quality Products at Great Prices',
      position: { x: 20, y: 70 },
      properties: {
        fontSize: '18px',
        color: '#7f8c8d',
        fontWeight: 'normal',
        textAlign: 'center',
        width: '800px',
        height: 'auto',
        marginBottom: '40px'
      }
    },
    {
      id: 'image-hero',
      type: 'image',
      content: 'https://picsum.photos/800/400?random=4',
      position: { x: 20, y: 130 },
      properties: {
        width: '800px',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        alt: 'Special Offer'
      }
    },
    {
      id: 'heading-featured-products',
      type: 'heading',
      content: 'Featured Products',
      position: { x: 20, y: 570 },
      properties: {
        fontSize: '24px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px'
      }
    },
    {
      id: 'image-product1',
      type: 'image',
      content: 'https://picsum.photos/250/250?random=5',
      position: { x: 20, y: 620 },
      properties: {
        width: '250px',
        height: '250px',
        borderRadius: '8px',
        marginRight: '20px',
        marginBottom: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        alt: 'Product 1'
      }
    },
    {
      id: 'text-product1-name',
      type: 'text',
      content: 'Product Name 1',
      position: { x: 20, y: 880 },
      properties: {
        fontSize: '18px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '5px'
      }
    },
    {
      id: 'text-product1-price',
      type: 'text',
      content: '$99.99',
      position: { x: 20, y: 910 },
      properties: {
        fontSize: '16px',
        color: '#e74c3c',
        fontWeight: 'bold',
        marginBottom: '10px'
      }
    },
    {
      id: 'button-product1-buy',
      type: 'button',
      content: 'Add to Cart',
      position: { x: 20, y: 940 },
      properties: {
        backgroundColor: '#f39c12',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }
    },
    {
      id: 'image-product2',
      type: 'image',
      content: 'https://picsum.photos/250/250?random=6',
      position: { x: 290, y: 620 },
      properties: {
        width: '250px',
        height: '250px',
        borderRadius: '8px',
        marginRight: '20px',
        marginBottom: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        alt: 'Product 2'
      }
    },
    {
      id: 'text-product2-name',
      type: 'text',
      content: 'Product Name 2',
      position: { x: 290, y: 880 },
      properties: {
        fontSize: '18px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '5px'
      }
    },
    {
      id: 'text-product2-price',
      type: 'text',
      content: '$149.99',
      position: { x: 290, y: 910 },
      properties: {
        fontSize: '16px',
        color: '#e74c3c',
        fontWeight: 'bold',
        marginBottom: '10px'
      }
    },
    {
      id: 'button-product2-buy',
      type: 'button',
      content: 'Add to Cart',
      position: { x: 290, y: 940 },
      properties: {
        backgroundColor: '#f39c12',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }
    }
  ]
};

// Landing page template
export const landingPageTemplate = {
  name: 'Landing Page',
  description: 'A high-converting landing page template with call-to-action and features section.',
  elements: [
    {
      id: 'heading-product-name',
      type: 'heading',
      content: 'Your Amazing Product',
      position: { x: 20, y: 20 },
      properties: {
        fontSize: '36px',
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '800px',
        height: 'auto',
        display: 'block',
        marginBottom: '20px'
      }
    },
    {
      id: 'paragraph-hero',
      type: 'paragraph',
      content: 'The revolutionary solution that will transform how you work. Save time, increase productivity, and achieve more with less effort.',
      position: { x: 20, y: 90 },
      properties: {
        fontSize: '18px',
        color: '#7f8c8d',
        lineHeight: '1.6',
        textAlign: 'center',
        width: '800px',
        height: 'auto',
        display: 'block',
        marginBottom: '30px'
      }
    },
    {
      id: 'button-cta-main',
      type: 'button',
      content: 'Get Started Now',
      position: { x: 300, y: 180 },
      properties: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize: '18px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }
    },
    {
      id: 'image-hero',
      type: 'image',
      content: 'https://picsum.photos/800/400?random=7',
      position: { x: 20, y: 250 },
      properties: {
        width: '800px',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '40px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        alt: 'Product Demo'
      }
    },
    {
      id: 'heading-features',
      type: 'heading',
      content: 'Key Features',
      position: { x: 20, y: 700 },
      properties: {
        fontSize: '28px',
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        marginBottom: '30px'
      }
    },
    {
      id: 'text-feature1',
      type: 'text',
      content: '✓ Easy to Use',
      position: { x: 20, y: 760 },
      properties: {
        fontSize: '18px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '15px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'text-feature2',
      type: 'text',
      content: '✓ Time-Saving',
      position: { x: 20, y: 800 },
      properties: {
        fontSize: '18px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '15px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'text-feature3',
      type: 'text',
      content: '✓ Cost-Effective',
      position: { x: 20, y: 840 },
      properties: {
        fontSize: '18px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '15px',
        width: '200px',
        height: 'auto',
        display: 'block'
      }
    },
    {
      id: 'button-cta-secondary',
      type: 'button',
      content: 'Learn More',
      position: { x: 20, y: 900 },
      properties: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '4px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }
    }
  ]
};

// Paralbag e-commerce template inspired by the Parallax BigCommerce Bag Store Theme
export const paralbagTemplate = {
  name: 'Paralbag Store',
  description: 'A premium bag store template with parallax effects, inspired by the Paralbag BigCommerce theme.',
  elements: [
    // Background element
    {
      id: 'background-main',
      type: 'background',
      content: '',
      position: { x: 0, y: 0 },
      properties: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: '-1',
        opacity: '1',
        blur: '0px',
        grayscale: '0%',
        sepia: '0%',
        hueRotate: '0deg',
        contrast: '100%',
        brightness: '100%'
      }
    },
    // Header navigation
    {
      id: 'header-nav',
      type: 'text',
      content: 'HOME    SHOP    COLLECTIONS    ABOUT    CONTACT',
      position: { x: 0, y: 20 },
      properties: {
        fontSize: '14px',
        color: '#333333',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '2px',
        padding: '15px 0',
        borderBottom: '1px solid #eaeaea'
      }
    },
    // Logo
    {
      id: 'logo-text',
      type: 'heading',
      content: 'PARALBAG',
      position: { x: 0, y: 80 },
      properties: {
        fontSize: '36px',
        color: '#222222',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '4px',
        marginBottom: '5px'
      }
    },
    {
      id: 'logo-tagline',
      type: 'text',
      content: 'PREMIUM BAG COLLECTION',
      position: { x: 0, y: 130 },
      properties: {
        fontSize: '14px',
        color: '#777777',
        fontWeight: 'normal',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '3px',
        marginBottom: '30px'
      }
    },
    // Hero image with parallax effect
    {
      id: 'hero-image',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
      position: { x: 0, y: 180 },
      properties: {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
        marginBottom: '0px',
        alt: 'Premium Leather Bags'
      }
    },
    // Hero overlay text
    {
      id: 'hero-overlay-heading',
      type: 'heading',
      content: 'LUXURY BAGS',
      position: { x: 50, y: 300 },
      properties: {
        fontSize: '48px',
        color: '#ffffff',
        fontWeight: 'bold',
        textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
        letterSpacing: '5px',
        zIndex: '2'
      }
    },
    {
      id: 'hero-overlay-text',
      type: 'text',
      content: 'HANDCRAFTED WITH PREMIUM LEATHER',
      position: { x: 50, y: 370 },
      properties: {
        fontSize: '16px',
        color: '#ffffff',
        fontWeight: 'normal',
        textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
        letterSpacing: '3px',
        zIndex: '2'
      }
    },
    {
      id: 'hero-button',
      type: 'button',
      content: 'SHOP NOW',
      position: { x: 50, y: 420 },
      properties: {
        backgroundColor: '#ffffff',
        color: '#222222',
        padding: '12px 30px',
        borderRadius: '0px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '2px',
        fontSize: '14px',
        zIndex: '2'
      }
    },
    // Featured categories section
    {
      id: 'featured-heading',
      type: 'heading',
      content: 'FEATURED CATEGORIES',
      position: { x: 0, y: 720 },
      properties: {
        fontSize: '24px',
        color: '#222222',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '3px',
        marginBottom: '40px',
        marginTop: '40px'
      }
    },
    // Category 1
    {
      id: 'category-image-1',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      position: { x: 50, y: 800 },
      properties: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '0px',
        marginRight: '30px',
        marginBottom: '15px',
        alt: 'Tote Bags'
      }
    },
    {
      id: 'category-name-1',
      type: 'text',
      content: 'TOTE BAGS',
      position: { x: 50, y: 1110 },
      properties: {
        fontSize: '18px',
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: '2px',
        marginBottom: '5px'
      }
    },
    {
      id: 'category-price-1',
      type: 'text',
      content: 'FROM $99',
      position: { x: 50, y: 1140 },
      properties: {
        fontSize: '14px',
        color: '#777777',
        fontWeight: 'normal',
        marginBottom: '10px'
      }
    },
    // Category 2
    {
      id: 'category-image-2',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      position: { x: 380, y: 800 },
      properties: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '0px',
        marginRight: '30px',
        marginBottom: '15px',
        alt: 'Crossbody Bags'
      }
    },
    {
      id: 'category-name-2',
      type: 'text',
      content: 'CROSSBODY BAGS',
      position: { x: 380, y: 1110 },
      properties: {
        fontSize: '18px',
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: '2px',
        marginBottom: '5px'
      }
    },
    {
      id: 'category-price-2',
      type: 'text',
      content: 'FROM $79',
      position: { x: 380, y: 1140 },
      properties: {
        fontSize: '14px',
        color: '#777777',
        fontWeight: 'normal',
        marginBottom: '10px'
      }
    },
    // Category 3
    {
      id: 'category-image-3',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1575891611210-0bfbe9a2a665?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      position: { x: 710, y: 800 },
      properties: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '0px',
        marginBottom: '15px',
        alt: 'Backpacks'
      }
    },
    {
      id: 'category-name-3',
      type: 'text',
      content: 'BACKPACKS',
      position: { x: 710, y: 1110 },
      properties: {
        fontSize: '18px',
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: '2px',
        marginBottom: '5px'
      }
    },
    {
      id: 'category-price-3',
      type: 'text',
      content: 'FROM $129',
      position: { x: 710, y: 1140 },
      properties: {
        fontSize: '14px',
        color: '#777777',
        fontWeight: 'normal',
        marginBottom: '10px'
      }
    },
    // Featured product section
    {
      id: 'featured-product-heading',
      type: 'heading',
      content: 'FEATURED PRODUCT',
      position: { x: 0, y: 1220 },
      properties: {
        fontSize: '24px',
        color: '#222222',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '3px',
        marginBottom: '40px',
        marginTop: '40px'
      }
    },
    {
      id: 'featured-product-image',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      position: { x: 50, y: 1300 },
      properties: {
        width: '500px',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '0px',
        marginRight: '50px',
        marginBottom: '30px',
        alt: 'Premium Leather Tote'
      }
    },
    {
      id: 'featured-product-name',
      type: 'heading',
      content: 'PREMIUM LEATHER TOTE',
      position: { x: 600, y: 1320 },
      properties: {
        fontSize: '24px',
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: '2px',
        marginBottom: '20px'
      }
    },
    {
      id: 'featured-product-price',
      type: 'text',
      content: '$149.99',
      position: { x: 600, y: 1370 },
      properties: {
        fontSize: '20px',
        color: '#222222',
        fontWeight: 'bold',
        marginBottom: '20px'
      }
    },
    {
      id: 'featured-product-description',
      type: 'paragraph',
      content: 'Handcrafted with premium full-grain leather, this tote bag combines elegance with functionality. Perfect for everyday use with ample space for all your essentials. Features durable stitching and a magnetic closure.',
      position: { x: 600, y: 1410 },
      properties: {
        fontSize: '14px',
        color: '#555555',
        lineHeight: '1.6',
        width: '400px',
        marginBottom: '30px'
      }
    },
    {
      id: 'featured-product-button',
      type: 'button',
      content: 'ADD TO CART',
      position: { x: 600, y: 1530 },
      properties: {
        backgroundColor: '#222222',
        color: '#ffffff',
        padding: '12px 30px',
        borderRadius: '0px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '2px',
        fontSize: '14px'
      }
    },
    // Newsletter section
    {
      id: 'newsletter-heading',
      type: 'heading',
      content: 'SUBSCRIBE TO OUR NEWSLETTER',
      position: { x: 0, y: 1750 },
      properties: {
        fontSize: '24px',
        color: '#222222',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        letterSpacing: '3px',
        marginBottom: '20px',
        marginTop: '40px'
      }
    },
    {
      id: 'newsletter-text',
      type: 'text',
      content: 'Stay updated with our latest collections and exclusive offers',
      position: { x: 0, y: 1800 },
      properties: {
        fontSize: '16px',
        color: '#555555',
        fontWeight: 'normal',
        textAlign: 'center',
        width: '100%',
        marginBottom: '30px'
      }
    },
    {
      id: 'newsletter-button',
      type: 'button',
      content: 'SUBSCRIBE',
      position: { x: 0, y: 1850 },
      properties: {
        backgroundColor: '#222222',
        color: '#ffffff',
        padding: '12px 30px',
        borderRadius: '0px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '2px',
        fontSize: '14px',
        textAlign: 'center',
        width: '200px',
        display: 'block',
        margin: '0 auto'
      }
    },
    // Footer
    {
      id: 'footer-text',
      type: 'text',
      content: '© 2025 PARALBAG. All Rights Reserved.',
      position: { x: 0, y: 1950 },
      properties: {
        fontSize: '14px',
        color: '#777777',
        fontWeight: 'normal',
        textAlign: 'center',
        width: '100%',
        padding: '20px 0',
        borderTop: '1px solid #eaeaea',
        marginTop: '50px'
      }
    }
  ]
};

// Collection of all built-in templates
export const builtInTemplates = [
  businessTemplate,
  portfolioTemplate,
  blogTemplate,
  ecommerceTemplate,
  paralbagTemplate,
  landingPageTemplate
];
