
// DigiStudio AI - Main Application

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

const workspace = document.getElementById("workspaceSection");
const productsContainer = document.querySelector(".products");
const savedList = document.getElementById("savedProjectsList");

// Navigation
function showSection(page) {
  const sections = {
    dashboard: ["dashboardSection", "productsSection"],
    products: ["productsSection"],
    saved: ["savedSection"],
    design: ["designSection"]
  };

  document.querySelectorAll(
    "#dashboardSection, #productsSection, #savedSection, #designSection, #workspaceSection"
  ).forEach(section => {
    section.style.display = "none";
  });

  (sections[page] || sections.dashboard).forEach(id => {
    const section = document.getElementById(id);
    if (section) section.style.display = "block";
  });

  document.querySelectorAll("#mainNavigation button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("#mainNavigation button").forEach(button => {
  button.addEventListener("click", () => {
    showSection(button.dataset.page);
  });
});

// Product library
function displayProducts() {
  productsContainer.innerHTML = "";

  products.forEach(([emoji, name, description]) => {
    const card = document.createElement("div");
    card.className = "product";
    card.dataset.name = name.toLowerCase();

    card.innerHTML = `
      <div class="emoji">${emoji}</div>
      <h3>${name}</h3>
      <p>${description}</p>
    `;

    card.addEventListener("click", () => {
      openWorkspace(name);
    });

    productsContainer.appendChild(card);
  });
}

// Product search
document.getElementById("productSearch")
  .addEventListener("input", event => {
    const query = event.target.value.toLowerCase();

    document.querySelectorAll(".product").forEach(card => {
      card.style.display = card.dataset.name.includes(query)
        ? "block"
        : "none";
    });
  });

// Open product workspace
function openWorkspace(productName) {
  workspace.style.display = "block";

  workspace.innerHTML = `
    <button class="btn btn-secondary" id="backToProducts">
      ← Back to Products
    </button>

    <h2 style="margin-top:20px;">Create ${productName}</h2>

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

      <button class="btn" type="submit">
        Save Product Details
      </button>
    </form>

    <div id="productMessage" style="margin-top:15px;"></div>
  `;

  document.getElementById("backToProducts")
    .addEventListener("click", () => {
      workspace.style.display = "none";
      showSection("products");
    });

  document.getElementById("productForm")
    .addEventListener("submit", event => {
      event.preventDefault();

      const details = {
        type: productName,
        title: document.getElementById("productTitle").value.trim(),
        problem: document.getElementById("productProblem").value.trim(),
        audience: document.getElementById("productAudience").value.trim(),
        design: document.getElementById("productStyle").value,
        pages: []
      };

      const savedProduct = DigiStudioEditor.saveProduct(details);

      displaySavedProjects();
      showPageEditor(savedProduct);
    });

  workspace.scrollIntoView({ behavior: "smooth" });
}

// Escape text before inserting it into HTML
function escapeHTML(value) {
  const element = document.createElement("div");
  element.textContent = value || "";
  return element.innerHTML;
}

// Saved projects
function displaySavedProjects() {
  const saved = DigiStudioEditor.getProducts();

  savedList.innerHTML = "";

  if (saved.length === 0) {
    savedList.textContent = "You have no saved projects yet.";
    return;
  }

  saved.forEach(product => {
    const item = document.createElement("div");

    item.style.cssText =
      "padding:15px;margin:12px 0;border:1px solid #e5eaf1;border-radius:9px;";

    const title = document.createElement("h3");
    title.textContent = product.title;

    const type = document.createElement("p");
    type.textContent = product.type;

    const viewButton = document.createElement("button");
    viewButton.textContent = "Open Project";
    viewButton.className = "btn";

    viewButton.addEventListener("click", () => {
      showPageEditor(product);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Project";
    deleteButton.className = "btn";
    deleteButton.style.cssText =
      "margin:8px 0 0 8px;background:#b42318;";

    deleteButton.addEventListener("click", () => {
      if (confirm("Delete this saved project?")) {
        DigiStudioEditor.deleteProduct(product.id);
        displaySavedProjects();
      }
    });

    item.append(title, type, viewButton, deleteButton);
    savedList.appendChild(item);
  });
}

// Product page editor
function showPageEditor(product) {
  if (!product.pages) {
    product.pages = [];
  }

  workspace.style.display = "block";

  document.querySelectorAll(
    "#dashboardSection, #productsSection, #savedSection, #designSection"
  ).forEach(section => {
    section.style.display = "none";
  });

  workspace.innerHTML = `
    <button class="btn btn-secondary" id="backToProjects">
      ← Back to Projects
    </button>

    <h2 style="margin-top:20px;">📖 Edit Your Product</h2>

    <p><strong>${escapeHTML(product.title)}</strong></p>

    <div id="pageList" style="margin:15px 0;"></div>

    <button class="btn" id="addPageButton">
      + Add New Page
    </button>

    <div id="pageEditor" style="margin-top:20px;"></div>

    <button class="btn" id="savePagesButton"
      style="margin-top:15px;">
      Save All Pages
    </button>

    <p id="saveMessage" style="margin-top:12px;"></p>
  `;

  document.getElementById("backToProjects")
    .addEventListener("click", () => {
      workspace.style.display = "none";
      showSection("saved");
    });

  const pageList = document.getElementById("pageList");
  const pageEditor = document.getElementById("pageEditor");

  function renderPages() {
    pageList.innerHTML = "";

    if (product.pages.length === 0) {
      pageList.textContent = "No pages added yet. Add your first page.";
      return;
    }

    product.pages.forEach((page, index) => {
      const button = document.createElement("button");
      button.textContent = `Page ${index + 1}: ${page.title}`;
      button.className = "btn btn-secondary";
      button.style.margin = "5px 5px 5px 0";

      button.addEventListener("click", () => {
        editPage(page);
      });

      pageList.appendChild(button);
    });
  }

  
function editPage(page) {
  if (!page.layout) page.layout = "standard";

  const layoutOptions = {
    "Ebooks": [
      ["standard", "Reading page"],
      ["chapter", "Chapter opener"],
      ["quote", "Quote page"],
      ["section", "Section divider"]
    ],
    "Workbooks": [
      ["standard", "Reading page"],
      ["exercise", "Exercise page"],
      ["worksheet", "Worksheet"],
      ["reflection", "Reflection page"]
    ],
    "Planners": [
      ["standard", "Notes page"],
      ["daily", "Daily planner"],
      ["weekly", "Weekly planner"],
      ["tracker", "Tracker page"]
    ],
    "Financial Trackers": [
      ["standard", "Notes page"],
      ["budget", "Budget summary"],
      ["tracker", "Tracker page"],
      ["table", "Table layout"]
    ],
    "Presentation Slides": [
      ["slide", "Title slide"],
      ["standard", "Content slide"],
      ["quote", "Quote slide"]
    ]
  };

  const options = layoutOptions[product.type] || [
    ["standard", "Standard page"],
    ["chapter", "Heading page"],
    ["section", "Section divider"],
    ["table", "Structured page"]
  ];

  pageEditor.innerHTML = `
    <h3>Design Your Page</h3>

    <label>Page title</label>
    <input id="pageTitle"
      value="${escapeHTML(page.title)}"
      style="width:100%;padding:12px;margin:8px 0;">

    <label>Page content</label>
    <textarea id="pageContent"
      style="width:100%;min-height:180px;padding:12px;margin:8px 0;">${escapeHTML(page.content)}</textarea>

    <label>Choose page layout</label>
    <select id="pageLayout"
      style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">
      ${options.map(([value, label]) =>
        `<option value="${value}" ${page.layout === value ? "selected" : ""}>${label}</option>`
      ).join("")}
    </select>

    <h3>Live Page Preview</h3>

    <div id="interiorPreview"
      style="min-height:300px;max-width:600px;margin:10px auto;padding:28px;background:white;border:1px solid #ddd;box-shadow:0 3px 12px #0001;">
      <h2 id="previewTitle"></h2>
      <div id="previewContent"
        style="white-space:pre-wrap;line-height:1.8;"></div>
      <div id="previewExtra"></div>
    </div>

    <button class="btn" id="updatePageButton">
      Update Page
    </button>

    <button class="btn" id="deletePageButton"
      style="background:#b42318;margin-top:8px;">
      Delete Page
    </button>
  `;

  const titleInput = document.getElementById("pageTitle");
  const contentInput = document.getElementById("pageContent");
  const layoutInput = document.getElementById("pageLayout");

  function updatePreview() {
    const title = titleInput.value.trim() || "Your Page Title";
    const content = contentInput.value || "Your page content will appear here.";

    const preview = document.getElementById("interiorPreview");
    const previewTitle = document.getElementById("previewTitle");
    const previewContent = document.getElementById("previewContent");
    const extra = document.getElementById("previewExtra");

    previewTitle.textContent = title;
    previewContent.textContent = content;
    extra.innerHTML = "";

    preview.style.background = "#ffffff";
    preview.style.color = "#263238";
    preview.style.borderTop = "1px solid #ddd";
    previewTitle.style.textAlign = "left";
    previewTitle.style.fontFamily = "Georgia, serif";
    previewTitle.style.borderBottom = "2px solid #e5eaf1";
    previewTitle.style.paddingBottom = "12px";

    const layout = layoutInput.value;

    if (layout === "chapter") {
      preview.style.borderTop = "8px solid #287a52";
      previewTitle.style.textAlign = "center";
      previewTitle.style.marginTop = "35px";
    }

    if (layout === "quote") {
      preview.style.background = "#f7f2e9";
      previewTitle.style.textAlign = "center";
      previewContent.style.fontStyle = "italic";
      previewContent.style.textAlign = "center";
      previewContent.style.padding = "35px 10px";
    } else {
      previewContent.style.fontStyle = "normal";
      previewContent.style.textAlign = "left";
      previewContent.style.padding = "10px 0";
    }

    if (layout === "section") {
      preview.style.background = "#14213d";
      preview.style.color = "#ffffff";
      previewTitle.style.color = "#ffffff";
      previewTitle.style.textAlign = "center";
      previewTitle.style.marginTop = "75px";
      previewTitle.style.borderBottom = "none";
    }

    if (layout === "exercise") {
  const heading = document.createElement("h3");
  heading.textContent = "✍️ Complete the Exercise";
  heading.style.marginTop = "25px";
  extra.appendChild(heading);

  for (let i = 1; i <= 4; i++) {
    const question = document.createElement("div");
    question.textContent = `${i}. Write your answer:`;
    question.style.marginTop = "18px";
    extra.appendChild(question);

    const line = document.createElement("div");
    line.style.borderBottom = "1px solid #aaa";
    line.style.height = "30px";
    extra.appendChild(line);
  }
}

if (layout === "worksheet") {
  const heading = document.createElement("h3");
  heading.textContent = "📋 Worksheet";
  heading.style.marginTop = "25px";
  extra.appendChild(heading);

  const instruction = document.createElement("p");
  instruction.textContent = "Complete each task below:";
  extra.appendChild(instruction);

  for (let i = 1; i <= 5; i++) {
    const task = document.createElement("div");
    task.textContent = `☐  Task ${i}: __________________________`;
    task.style.padding = "14px 8px";
    task.style.margin = "8px 0";
    task.style.background = "#f0f5fa";
    task.style.borderRadius = "6px";
    extra.appendChild(task);
  }
}

if (layout === "reflection") {
  const heading = document.createElement("h3");
  heading.textContent = "💭 Reflection Questions";
  heading.style.marginTop = "25px";
  extra.appendChild(heading);

  const questions = [
    "1. What did I learn?",
    "2. What was challenging?",
    "3. How will I use what I learned?"
  ];

  questions.forEach(questionText => {
    const question = document.createElement("p");
    question.textContent = questionText;
    question.style.marginTop = "20px";
    extra.appendChild(question);

    for (let i = 0; i < 2; i++) {
      const line = document.createElement("div");
      line.style.borderBottom = "1px solid #aaa";
      line.style.height = "28px";
      extra.appendChild(line);
    }
  });
}

    if (layout === "daily" || layout === "weekly") {
      const note = document.createElement("p");
      note.textContent = layout === "daily"
        ? "Today's priorities and tasks"
        : "Weekly goals and tasks";
      note.style.marginTop = "25px";
      extra.appendChild(note);

      for (let i = 0; i < 5; i++) {
        const line = document.createElement("div");
        line.textContent = "☐  ______________________________";
        line.style.padding = "12px 0";
        extra.appendChild(line);
      }
    }

    if (layout === "tracker" || layout === "budget" || layout === "table") {
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.marginTop = "20px";
      table.style.borderCollapse = "collapse";

      for (let i = 0; i < 5; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 2; j++) {
          const cell = row.insertCell();
          cell.textContent = i === 0
            ? (j === 0 ? "Item" : "Details")
            : "________________";
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "10px";
        }
      }

      extra.appendChild(table);
    }

    if (layout === "slide") {
      preview.style.background = "#14213d";
      preview.style.color = "#ffffff";
      previewTitle.style.color = "#ffffff";
      previewTitle.style.textAlign = "center";
      previewContent.style.color = "#ffffff";
      previewContent.style.textAlign = "center";
      previewTitle.style.marginTop = "65px";
    }
  }

  titleInput.addEventListener("input", updatePreview);
  contentInput.addEventListener("input", updatePreview);
  layoutInput.addEventListener("change", updatePreview);

  document.getElementById("updatePageButton")
    .addEventListener("click", () => {
      DigiStudioPages.updatePage(
        product,
        page.id,
        titleInput.value.trim(),
        contentInput.value
      );

      page.layout = layoutInput.value;
      renderPages();

      pageEditor.textContent =
        "Page and design updated. Remember to save your changes.";
    });

  document.getElementById("deletePageButton")
    .addEventListener("click", () => {
      if (confirm("Delete this page?")) {
        DigiStudioPages.deletePage(product, page.id);
        renderPages();
        pageEditor.textContent =
          "Page deleted. Remember to save your changes.";
      }
    });

  updatePreview();
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

      document.getElementById("saveMessage").textContent =
        saved
          ? "All pages saved successfully!"
          : "Could not save pages. Please try again.";

      if (saved) {
        displaySavedProjects();
      }
    });

  renderPages();
  workspace.scrollIntoView({ behavior: "smooth" });
}

// Start application
displayProducts();
displaySavedProjects();
showSection("dashboard");

console.log("DigiStudio AI application loaded.");
