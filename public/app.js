const products = document.querySelectorAll(".product");
const workspace = document.querySelector(".workspace");

products.forEach((product) => {
  product.style.cursor = "pointer";

  product.addEventListener("click", () => {
    const productName = product.querySelector("h3").textContent;

    workspace.innerHTML = `
      <h2>Create ${productName}</h2>
      <p>You selected ${productName}. Your creation workspace will be prepared here.</p>
      <button class="btn" id="backButton">Back to products</button>
    `;

    document.getElementById("backButton").addEventListener("click", () => {
      location.reload();
    });

    workspace.scrollIntoView({ behavior: "smooth" });
  });
});

// Dashboard ready
console.log("DigiStudio AI dashboard loaded successfully.");
