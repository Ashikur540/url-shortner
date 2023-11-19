export function validateURL(url) {
    // Regular expression to validate URLs
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  
    // Test the URL against the pattern
    return urlPattern.test(url);
  }