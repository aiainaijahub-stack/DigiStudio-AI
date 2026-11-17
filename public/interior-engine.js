
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
// WORKBOOK PAGE DESIGNS

register("exercise", function (elements) {
  const { preview, title, extra, helpers } = elements;

  preview.style.background = "#f8fbff";
  preview.style.borderTop = "6px solid #287a52";
  title.style.color = "#17613f";
  title.style.fontFamily = "Arial, sans-serif";
  title.style.fontSize = "25px";

  const heading = helpers.createElement("h3", "✍️ Exercise Time", {
    color: "#17613f",
    marginTop: "25px"
  });
  extra.appendChild(heading);

  const instruction = helpers.createElement(
    "p",
    "Read each question carefully and write your answer in the space provided."
  );
  extra.appendChild(instruction);

  for (let i = 1; i <= 4; i++) {
    const card = helpers.createCard(extra);

    const question = helpers.createElement(
      "strong",
      `Question ${i}`,
      { color: "#17613f" }
    );

    card.appendChild(question);

    const prompt = helpers.createElement(
      "p",
      "Write your answer:",
      { marginTop: "10px" }
    );

    card.appendChild(prompt);
    helpers.addWritingLines(card, 2);
  }
});

register("worksheet", function (elements) {
  const { preview, title, extra, helpers } = elements;

  preview.style.background = "#f4f8fc";
  preview.style.borderTop = "6px solid #287a52";
  title.style.color = "#17613f";
  title.style.fontFamily = "Arial, sans-serif";
  title.style.fontSize = "25px";

  const heading = helpers.createElement(
    "h3",
    "📋 Practice Worksheet",
    { color: "#17613f", marginTop: "25px" }
  );

  extra.appendChild(heading);

  const instruction = helpers.createElement(
    "p",
    "Complete each task and tick the box when finished.",
    { color: "#52645a" }
  );

  extra.appendChild(instruction);

  for (let i = 1; i <= 5; i++) {
    const card = helpers.createCard(extra);

    const task = helpers.createElement(
      "strong",
      `☐ Task ${i}`,
      { color: "#17613f" }
    );

    card.appendChild(task);

    card.appendChild(
      helpers.createElement("div", "Your answer:", {
        marginTop: "12px"
      })
    );

    helpers.addWritingLines(card, 1);
  }
});

register("reflection", function (elements) {
  const { preview, title, extra, helpers } = elements;

  preview.style.background = "#fbf8ff";
  preview.style.borderTop = "6px solid #8064a2";
  title.style.color = "#624583";
  title.style.fontFamily = "Arial, sans-serif";
  title.style.fontSize = "25px";

  const heading = helpers.createElement(
    "h3",
    "💭 My Reflection Journal",
    { color: "#624583", marginTop: "25px" }
  );

  extra.appendChild(heading);

  extra.appendChild(
    helpers.createElement(
      "p",
      "Take a moment to think about what you have learned. Write your thoughts below.",
      { color: "#685b75", lineHeight: "1.6" }
    )
  );

  const questions = [
    "1. What did I learn?",
    "2. What was challenging?",
    "3. How will I use what I learned?"
  ];

  questions.forEach(questionText => {
    const card = helpers.createCard(extra);

    card.style.borderLeft = "5px solid #8064a2";

    card.appendChild(
      helpers.createElement(
        "strong",
        questionText,
        { color: "#624583" }
      )
    );

    helpers.addWritingLines(card, 3);
  });
});
 // EBOOK PAGE DESIGNS

// Standard reading page
register("standard", function (elements) {
  const { preview, title, content } = elements;

  preview.style.background = "#ffffff";
  preview.style.borderTop = "4px solid #287a52";

  title.style.color = "#263238";
  title.style.fontFamily = "Georgia, serif";
  title.style.fontSize = "25px";

  content.style.fontFamily = "Georgia, serif";
  content.style.lineHeight = "1.9";
  content.style.color = "#374151";
});

// Chapter opener
register("chapter", function (elements) {
  const { preview, title, content, extra, helpers } = elements;

  preview.style.background = "#f8fbff";
  preview.style.borderTop = "8px solid #287a52";

  title.style.color = "#17613f";
  title.style.textAlign = "center";
  title.style.fontFamily = "Georgia, serif";
  title.style.fontSize = "28px";
  title.style.marginTop = "35px";

  content.style.fontFamily = "Georgia, serif";
  content.style.lineHeight = "1.9";

  const label = helpers.createElement(
    "p",
    "CHAPTER",
    {
      color: "#287a52",
      textAlign: "center",
      letterSpacing: "4px",
      fontWeight: "bold",
      marginTop: "35px"
    }
  );

  extra.appendChild(label);
});

// Quote page
register("quote", function (elements) {
  const { preview, title, content } = elements;

  preview.style.background = "#f7f2e9";
  preview.style.borderTop = "5px solid #b89b69";

  title.style.color = "#735c37";
  title.style.textAlign = "center";
  title.style.fontFamily = "Georgia, serif";
  title.style.fontSize = "26px";

  content.style.fontFamily = "Georgia, serif";
  content.style.fontStyle = "italic";
  content.style.textAlign = "center";
  content.style.fontSize = "19px";
  content.style.lineHeight = "2";
  content.style.padding = "45px 10px";
});

// Section divider
register("section", function (elements) {
  const { preview, title, content, extra } = elements;

  preview.style.background = "#14213d";
  preview.style.borderTop = "8px solid #287a52";

  title.style.color = "#ffffff";
  title.style.textAlign = "center";
  title.style.fontFamily = "Georgia, serif";
  title.style.fontSize = "30px";
  title.style.marginTop = "75px";
  title.style.borderBottom = "none";

  content.style.color = "#ffffff";
  content.style.textAlign = "center";
  content.style.fontFamily = "Georgia, serif";
  content.style.lineHeight = "1.9";

  const decoration = document.createElement("div");
  decoration.textContent = "◆  ◆  ◆";
  decoration.style.color = "#d4af70";
  decoration.style.textAlign = "center";
  decoration.style.marginTop = "35px";

  extra.appendChild(decoration);
});
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
         
