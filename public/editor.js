// DigiStudio AI - Product Editor

const DigiStudioEditor = {

  // Save product details in the browser
  saveProduct(details) {
    let savedProducts = [];

    try {
      savedProducts = JSON.parse(
        localStorage.getItem("digistudio_products") || "[]"
      );
    } catch (error) {
      savedProducts = [];
    }

    details.id = Date.now();
    details.createdAt = new Date().toISOString();

    savedProducts.push(details);

    localStorage.setItem(
      "digistudio_products",
      JSON.stringify(savedProducts)
    );

    return details;
  },

  // Retrieve saved products
  getProducts() {
    try {
      return JSON.parse(
        localStorage.getItem("digistudio_products") || "[]"
      );
    } catch (error) {
      return [];
    }
  },

  // Delete a saved product
  deleteProduct(id) {
    const products = this.getProducts().filter(
      product => product.id !== id
    );

    localStorage.setItem(
      "digistudio_products",
      JSON.stringify(products)
    );
  }

};

console.log("DigiStudio product editor loaded.");
