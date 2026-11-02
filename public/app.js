
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

    const savedProduct = DigiStudioEditor.saveProduct(details);

showPageEditor(savedProduct);

document.getElementById("productMessage").textContent =
  "Product saved successfully! You can continue editing later on this browser.";
  });

  workspace.scrollIntoView({ behavior: "smooth" });
}

console.log("DigiStudio AI product library loaded.");
// Saved Projects Section

const savedSection = document.createElement("section");

savedSection.className = "workspace";
savedSection.innerHTML = `
  <h2>My Saved Projects</h2>
  <p>View the digital products you have saved.</p>
  <div id="savedProjectsList"></div>
`;

workspace.after(savedSection);

function displaySavedProjects() {
  const list = document.getElementById("savedProjectsList");
  const saved = DigiStudioEditor.getProducts();

  list.innerHTML = "";

  if (saved.length === 0) {
    list.textContent = "You have no saved projects yet.";
    return;
  }

  saved.forEach(product => {
    const item = document.createElement("div");

    item.style.cssText =
      "padding:12px;margin:10px 0;border:1px solid #ddd;border-radius:8px;";

    const title = document.createElement("h3");
    title.textContent = product.title;

    const type = document.createElement("p");
    type.textContent = product.type;

    const viewButton = document.createElement("button");
    viewButton.textContent = "View project";
    viewButton.className = "btn";

    viewButton.addEventListener("click", () => {
      workspace.innerHTML = `
        <h2>Saved Project</h2>
        <p><strong>Title:</strong> ${escapeHTML(product.title)}</p>
        <p><strong>Type:</strong> ${escapeHTML(product.type)}</p>
        <p><strong>Problem:</strong> ${escapeHTML(product.problem)}</p>
        <p><strong>Audience:</strong> ${escapeHTML(product.audience)}</p>
        <p><strong>Design:</strong> ${escapeHTML(product.design)}</p>
      `;

      workspace.scrollIntoView({ behavior: "smooth" });
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete project";
    deleteButton.style.cssText =
      "margin-top:8px;padding:10px;background:#b42318;color:white;border:0;border-radius:8px;width:100%;";

    deleteButton.addEventListener("click", () => {
      if (confirm("Delete this saved project?")) {
        DigiStudioEditor.deleteProduct(product.id);
        displaySavedProjects();
      }
    });

    item.append(title, type, viewButton, deleteButton);
    list.appendChild(item);
  });
}

function escapeHTML(value) {
  const element = document.createElement("div");
  element.textContent = value || "";
  return element.innerHTML;
}

displaySavedProjects();
// DigiStudio AI - Visual Page Editor

function showPageEditor(product) {
  if (!product.pages) {
    product.pages = [];
  }

  workspace.innerHTML = `
    <h2>📖 Edit Your Product</h2>
    <p><strong>${escapeHTML(product.title)}</strong></p>

    <div id="pageList"></div>

    <button class="btn" id="addPageButton">
      + Add New Page
    </button>

    <div id="pageEditor" style="margin-top:20px;"></div>

    <button class="btn" id="savePagesButton"
      style="margin-top:15px;">
      Save All Pages
    </button>
  `;

  const pageList = document.getElementById("pageList");
  const pageEditor = document.getElementById("pageEditor");

  function renderPages() {
    pageList.innerHTML = "";

    product.pages.forEach((page, index) => {
      const button = document.createElement("button");
      button.textContent = `Page ${index + 1}: ${page.title}`;
      button.className = "btn";
      button.style.margin = "5px";

      button.addEventListener("click", () => {
        editPage(page);
      });

      pageList.appendChild(button);
    });
  }

  function editPage(page) {
    pageEditor.innerHTML = `
      <label>Page title</label>
      <input id="pageTitle"
        value="${escapeHTML(page.title)}"
        style="width:100%;padding:12px;margin:8px 0;">

      <label>Page content</label>
      <textarea id="pageContent"
        style="width:100%;min-height:180px;padding:12px;margin:8px 0;">${escapeHTML(page.content)}</textarea>

      <button class="btn" id="updatePageButton">
        Update Page
      </button>

      <button class="btn" id="deletePageButton"
        style="background:#b42318;margin-top:8px;">
        Delete Page
      </button>
    `;

    document.getElementById("updatePageButton")
      .addEventListener("click", () => {
        DigiStudioPages.updatePage(
          product,
          page.id,
          document.getElementById("pageTitle").value.trim(),
          document.getElementById("pageContent").value
        );

        renderPages();
        pageEditor.innerHTML = "<p>Page updated.</p>";
      });

    document.getElementById("deletePageButton")
      .addEventListener("click", () => {
        if (confirm("Delete this page?")) {
          DigiStudioPages.deletePage(product, page.id);
          renderPages();
          pageEditor.innerHTML = "<p>Page deleted.</p>";
        }
      });
  }

  document.getElementById("addPageButton")
    .addEventListener("click", () => {
      const page = DigiStudioPages.addPage(
        product,
        `Page ${product.pages.length + 1}`,
        ""
      );

      renderPages();
      editPage(page);
    });

  document.getElementById("savePagesButton")
    .addEventListener("click", () => {
      const saved = DigiStudioPages.savePages(product);

      document.getElementById("pageEditor").textContent =
        saved ? "All pages saved successfully!" :
        "Could not save pages. Please try again.";
    });

  renderPages();
  workspace.scrollIntoView({ behavior: "smooth" });
                          }
