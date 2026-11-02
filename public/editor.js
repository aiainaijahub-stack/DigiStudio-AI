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

// DigiStudio AI - Page Content Editor

const DigiStudioPages = {

  createPage(title = "New Page", content = "") {
    return {
      id: Date.now() + Math.random(),
      title: title,
      content: content
    };
  }

};
// Add a page to a product
DigiStudioPages.addPage = function(product, title, content = "") {
  if (!product.pages) {
    product.pages = [];
  }

  const page = DigiStudioPages.createPage(title, content);
  product.pages.push(page);

  return page;
};

// Update an existing page
DigiStudioPages.updatePage = function(product, pageId, title, content) {
  if (!product.pages) return false;

  const page = product.pages.find(p => p.id === pageId);
  if (!page) return false;

  page.title = title;
  page.content = content;

  return true;
};

// Delete a page
DigiStudioPages.deletePage = function(product, pageId) {
  if (!product.pages) return false;

  product.pages = product.pages.filter(p => p.id !== pageId);
  return true;
};
// Save product pages
DigiStudioPages.savePages = function(product) {
  if (!product || !product.id) return false;

  const savedProducts = DigiStudioEditor.getProducts();

  const index = savedProducts.findIndex(
    item => item.id === product.id
  );

  if (index === -1) return false;

  savedProducts[index] = product;

  localStorage.setItem(
    "digistudio_products",
    JSON.stringify(savedProducts)
  );

  return true;
};

console.log("DigiStudio page editor loaded.");
