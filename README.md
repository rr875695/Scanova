# Scanova - Institute and Organization Registration Platform

A responsive React.js application for institute and organization registration with a modern, user-friendly interface.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Institute Registration**: Complete registration form for educational institutes
- **Organization Registration**: Registration form for companies and organizations
- **User Authentication**: Login system with email and password
- **Modern UI**: Clean, professional design with teal color scheme
- **Form Validation**: Client-side validation for all forms
- **Success Feedback**: Clear success messages after registration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar with teal background
│   ├── Navbar.css
│   ├── LandingPage.js         # Home page with lock.png image
│   ├── LandingPage.css
│   ├── InstituteRegistration.js  # Institute registration form
│   ├── UserRegistration.js    # Organization registration form
│   ├── Registration.css       # Shared styles for registration forms
│   ├── Login.js              # Login page
│   └── Login.css
├── App.js                     # Main application component
├── App.css
├── index.js                   # Application entry point
└── index.css                  # Global styles
```

## Image Setup

To display the lock image on the landing page:

1. Place your `lock.png` image in the `public` folder
2. The image will automatically appear on the landing page
3. If the image is not found, a placeholder will be displayed

## Registration Forms

### Institute Registration
- Institute name
- Affiliation number
- Institute email address
- Contact number
- Address
- Principal details (name, contact, email)
- Total courses available
- Total degrees available

### Organization Registration
- Organization/Company name
- Company type (dropdown selection)
- Company email
- Contact number
- Address
- Certifications number
- License number

## Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly buttons and inputs
- Optimized typography for different screen sizes
- Collapsible navigation for mobile devices

## Technologies Used

- React.js 18
- CSS3 with Flexbox and Grid
- HTML5
- JavaScript ES6+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The application uses Create React App for development and building. All modern React features are supported including hooks, functional components, and modern JavaScript syntax.

## License

This project is created for demonstration purposes.
