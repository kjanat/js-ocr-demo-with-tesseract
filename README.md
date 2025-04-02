# JS OCR Demo with Tesseract

This project demonstrates Optical Character Recognition (OCR) using Tesseract.js, a pure JavaScript OCR library. It allows you to extract text from images directly in the browser or a Node.js environment.

## Features

- Extract text from images using Tesseract.js.
- Supports multiple languages.
- Runs entirely in JavaScript, no server-side processing required.

## Prerequisites

- Node.js installed on your system (for development and testing).
- A modern web browser (for client-side usage).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/js-ocr-demo-with-tesseract.git
   cd js-ocr-demo-with-tesseract
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Upload an image and let the OCR process extract the text.

### Running in Node.js

You can also use this project in a Node.js environment. Here's an example:

```javascript
const Tesseract = require('tesseract.js');

Tesseract.recognize('path/to/image.png', 'eng')
  .then(({ data: { text } }) => {
    console.log('Extracted Text:', text);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
