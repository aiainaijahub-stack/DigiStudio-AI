
const products = [
  ["📚", "Ebooks", "Digital books and guides"],
  ["📝", "Workbooks", "Exercises and practical guides"],
  ["📋", "Templates", "Editable business templates"],
  ["🎓", "Mini Courses", "Lessons and training materials"],
  ["🎁", "Product Bundles", "Combine products into packages"],
  ["🎨", "Product Design", "Covers and page layouts"],
  ["📅", "Planners", "Daily, weekly and monthly planners"],
  ["💰", "Financial Trackers", "Budgets and expense trackers"],
  ["🏢", "Business Plans", "Business plans and proposals"],
  ["📱", "Social Media Kits", "Content calendars and captions"],
  ["🍲", "Recipe Books", "Recipes and meal plans"],
  ["📖", "Study Guides", "Learning and revision materials"],
  ["🧩", "Activity Books", "Puzzles and activities"],
  ["📊", "Reports", "Professional reports and research"],
  ["💌", "Invitations", "Cards and digital invitations"],
  ["🎯", "Checklists", "Practical step-by-step checklists"],
  ["🖥️", "Presentation Slides", "Slides and teaching materials"],
  ["✨", "Custom Product", "Describe any product you want"]
];

const productsContainer = document.querySelector(".products");
const workspace = document.querySelector(".workspace");

// Add product search
const search = document.createElement("input");
search.type = "search";
search.placeholder = "Search digital product types...";
search.setAttribute("aria-label", "Search product types");
search.style.cssText =
  "width:100%;padding:14px;margin:0 0 15px;border:1px solid #dce2ea;border-radius:9px;font-size:15px;";

productsContainer.before(search);

// Build the product library
productsContainer.innerHTML = "";

products.forEach(([emoji, name, description]) => {
  const card = document.createElement("div");
  card.className = "product";
  card.style.cursor = "pointer";
  card.dataset.name = name.toLowerCase();

  card.innerHTML = `
    <div class="emoji">${emoji}</div>
    <h3>${name}</h3>
    <p>${description}</p>
  `;

  card.addEventListener("click", () => openWorkspace(name));
  productsContainer.appendChild(card);
});

// Search products
search.addEventListener("input", () => {
  const query = search.value.toLowerCase();

  document.querySelectorAll(".product").forEach(card => {
    card.style.display = card.dataset.name.includes(query)
      ? "block"
      : "none";
  });
});

// Open product workspace
function openWorkspace(productName) {
  workspace.innerHTML = `
    <h2>Create ${productName}</h2>
    <p>Tell us about the digital product you want to create.</p>

    <form id="productForm">
      <label>Product title</label>
      <input id="productTitle" required
        placeholder="Enter your product title"
        style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">

      <label>Problem your product solves</label>
      <textarea id="productProblem" required
        placeholder="Describe the problem..."
        style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;min-height:90px;"></textarea>

      <label>Target audience</label>
      <input id="productAudience" required
        placeholder="Who will use this product?"
        style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">

      <label>Design style</label>
      <select id="productStyle"
        style="width:100%;padding:12px;margin:8px 0 20px;border:1px solid #ddd;border-radius:8px;">
        <option>Modern and professional</option>
        <option>Minimalist</option>
        <option>Colourful and creative</option>
        <option>Elegant and premium</option>
        <option>Simple and educational</option>
      </select>

      <button class="btn" type="submit">Save Product Details</button>
    </form>

    <div id="productMessage" style="margin-top:15px;"></div>

    <button class="btn" id="backButton"
      style="margin-top:15px;background:#64748b;">
      Back to products
    </button>
  `;

  document.getElementById("backButton").addEventListener("click", () => {
    location.reload();
  });

  document.getElementById("productForm").addEventListener("submit", event => {
    event.preventDefault();

    const details = {
      type: productName,
      title: document.getElementById("productTitle").value.trim(),
      problem: document.getElementById("productProblem").value.trim(),
      audience: document.getElementById("productAudience").value.trim(),
      design: document.getElementById("productStyle").value
    };

    document.getElementById("productMessage").textContent =
      "Product details captured. AI generation and permanent project saving will be added in a later stage.";

    console.log("Product details:", details);
  });

  workspace.scrollIntoView({ behavior: "smooth" });
}

console.log("DigiStudio AI product library loaded.");
