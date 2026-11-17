
// DigiStudio AI - Reusable Interior Design Engine

(function () {
  const layouts = {};

  // Register a reusable page layout
  function register(name, renderFunction) {
    layouts[name] = renderFunction;
  }

  // Create an HTML element safely
  function createElement(tag, text, styles = {}) {
    const element = document.createElement(tag);

    if (text !== undefined && text !== null) {
      element.textContent = text;
    }

    Object.assign(element.style, styles);

    return element;
  }

  // Create writing lines
  function addWritingLines(container, count = 2) {
    for (let i = 0; i < count; i++) {
      const line = createElement("div", "", {
        height: "28px",
        borderBottom: "1px solid #ccc"
      });

      container.appendChild(line);
    }
  }

  // Create a reusable content card
  function createCard(container, options = {}) {
    const card = createElement("div", "", {
      background: options.background || "#ffffff",
      border: options.border || "1px solid #e5eaf1",
      borderRadius: options.radius || "8px",
      padding: options.padding || "15px",
      marginTop: options.marginTop || "15px"
    });

    container.appendChild(card);

    return card;
  }

  // Reset the preview before displaying another layout
  function resetPreview(preview, title, content, extra) {
    preview.style.background = "#ffffff";
    preview.style.color = "#263238";
    preview.style.borderTop = "1px solid #ddd";
    preview.style.padding = "28px";

    title.style.color = "#263238";
    title.style.textAlign = "left";
    title.style.fontFamily = "Georgia, serif";
    title.style.fontSize = "";
    title.style.marginTop = "0";
    title.style.borderBottom = "2px solid #e5eaf1";
    title.style.paddingBottom = "12px";

    content.style.color = "#263238";
    content.style.fontStyle = "normal";
    content.style.textAlign = "left";
    content.style.padding = "10px 0";

    extra.innerHTML = "";
  }

  // Display a registered layout
  function render(name, elements, data = {}) {
    const layout = layouts[name] || layouts.standard;

    if (typeof layout !== "function") {
      return false;
    }

    resetPreview(
      elements.preview,
      elements.title,
      elements.content,
      elements.extra
    );

    layout({
      ...elements,
      ...data,
      helpers: {
        createElement,
        addWritingLines,
        createCard
      }
    });

    return true;
  }

  // Standard reading page
  register("standard", function () {});

  // Make the engine available to the main application
  window.DigiStudioInterior = {
    register,
    render,
    createElement,
    addWritingLines,
    createCard
  };

  console.log("DigiStudio Interior Engine loaded.");
})();
         
