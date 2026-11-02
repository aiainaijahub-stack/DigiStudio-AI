// DigiStudio AI - Cover Designer
// Works without AI API calls.

(function () {
  const coverStyles = [
    {
      name: "Midnight",
      background: "#14213d",
      accent: "#fca311",
      text: "#ffffff"
    },
    {
      name: "Nature",
      background: "#e8f3e8",
      accent: "#287a52",
      text: "#193b2c"
    },
    {
      name: "Elegant",
      background: "#f7efe5",
      accent: "#a56b45",
      text: "#35251d"
    },
    {
      name: "Ocean",
      background: "#dff3f7",
      accent: "#087e8b",
      text: "#12343b"
    },
    {
      name: "Creative",
      background: "#f0e7ff",
      accent: "#7952b3",
      text: "#30204d"
    }
  ];

  function createCoverDesigner() {
    const workspace = document.querySelector(".products");

    if (!workspace) return;

    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = "🎨 Open Cover Designer";
    button.style.marginTop = "15px";

    workspace.parentNode.insertBefore(button, workspace.nextSibling);

    button.addEventListener("click", showDesigner);
  }

  function showDesigner() {
    let designer = document.getElementById("coverDesigner");

    if (!designer) {
      designer = document.createElement("section");
      designer.id = "coverDesigner";
      designer.className = "workspace";

      document.querySelector(".workspace").after(designer);
    }

    designer.innerHTML = `
      <h2>Cover Designer</h2>
      <p>Create a cover using ready-made design styles.</p>

      <label for="coverTitle">Product title</label>
      <input id="coverTitle" maxlength="100"
        placeholder="Your product title"
        style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">

      <label for="coverSubtitle">Subtitle</label>
      <input id="coverSubtitle" maxlength="160"
        placeholder="A short description"
        style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">

      <label for="coverAuthor">Author or brand name</label>
      <input id="coverAuthor" maxlength="80"
        placeholder="Author name"
        style="width:100%;padding:12px;margin:8px 0 15px;border:1px solid #ddd;border-radius:8px;">

      <label for="coverStyle">Choose a design</label>
      <select id="coverStyle"
        style="width:100%;padding:12px;margin:8px 0 20px;border:1px solid #ddd;border-radius:8px;">
        ${coverStyles.map((style, index) =>
          `<option value="${index}">${style.name}</option>`
        ).join("")}
      </select>

      <div id="coverPreview"
        style="width:100%;max-width:340px;aspect-ratio:3/4;margin:10px auto 20px;padding:25px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:5px;box-shadow:0 5px 18px #0002;">
      </div>

      <button id="downloadCover" class="btn">
        Download Cover
      </button>

      <p id="coverMessage" style="margin-top:12px;font-size:13px;"></p>
    `;

    ["coverTitle", "coverSubtitle", "coverAuthor", "coverStyle"]
      .forEach(id => {
        designer.querySelector("#" + id).addEventListener(
          "input",
          updatePreview
        );
      });

    designer.querySelector("#downloadCover")
      .addEventListener("click", downloadCover);

    updatePreview();
const backButton = document.createElement("button");
backButton.textContent = "Back to Products";
backButton.className = "btn";
backButton.style.marginTop = "10px";

backButton.addEventListener("click", () => {
  designer.scrollIntoView({ behavior: "smooth" });
  document.querySelector(".products").scrollIntoView({
    behavior: "smooth"
  });
});

designer.appendChild(backButton);
    designer.scrollIntoView({ behavior: "smooth" });
  }

  function updatePreview() {
    const title = document.getElementById("coverTitle").value.trim()
      || "Your Product Title";

    const subtitle = document.getElementById("coverSubtitle").value.trim()
      || "Your subtitle goes here";

    const author = document.getElementById("coverAuthor").value.trim()
      || "Your Brand";

    const selected = Number(
      document.getElementById("coverStyle").value
    );

    const style = coverStyles[selected];
    const preview = document.getElementById("coverPreview");

    preview.style.background = style.background;
    preview.style.color = style.text;
    preview.style.borderTop = `8px solid ${style.accent}`;
    preview.style.borderBottom = `8px solid ${style.accent}`;

    preview.innerHTML = "";

    const badge = document.createElement("div");
    badge.textContent = "DIGITAL EDITION";
    badge.style.cssText =
      `font-size:10px;letter-spacing:2px;color:${style.accent};margin-bottom:25px;`;

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.cssText =
      "font-family:Georgia,serif;font-size:clamp(22px,6vw,32px);line-height:1.2;overflow-wrap:anywhere;";

    const line = document.createElement("div");
    line.style.cssText =
      `width:55px;height:4px;background:${style.accent};margin:20px 0;`;

    const sub = document.createElement("p");
    sub.textContent = subtitle;
    sub.style.cssText =
      "font-size:13px;line-height:1.6;overflow-wrap:anywhere;";

    const byline = document.createElement("p");
    byline.textContent = author;
    byline.style.cssText =
      `font-size:12px;font-weight:bold;margin-top:35px;color:${style.accent};overflow-wrap:anywhere;`;

    preview.append(badge, heading, line, sub, byline);
  }

  function downloadCover() {
    const preview = document.getElementById("coverPreview");
    const message = document.getElementById("coverMessage");

    // Create a standalone SVG cover for download.
    const clone = preview.cloneNode(true);
    const width = 600;
    const height = 800;

    const style = coverStyles[
      Number(document.getElementById("coverStyle").value)
    ];

    const title = document.getElementById("coverTitle").value.trim()
      || "Your Product Title";

    const subtitle = document.getElementById("coverSubtitle").value.trim()
      || "Your subtitle goes here";

    const author = document.getElementById("coverAuthor").value.trim()
      || "Your Brand";

    function xmlEscape(text) {
      return text.replace(/[<>&"']/g, char => ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;"
      })[char]);
    }

    function wrapText(text, maxChars) {
      const words = text.split(/\s+/);
      const lines = [];
      let line = "";

      words.forEach(word => {
        const next = line ? line + " " + word : word;

        if (next.length > maxChars && line) {
          lines.push(line);
          line = word;
        } else {
          line = next;
        }
      });

      if (line) lines.push(line);
      return lines;
    }

    const titleLines = wrapText(title, 23);
    const subtitleLines = wrapText(subtitle, 42);

    let svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="600" height="800" fill="${style.background}"/>
        <rect x="0" y="0" width="600" height="12" fill="${style.accent}"/>
        <rect x="0" y="788" width="600" height="12" fill="${style.accent}"/>
        <text x="300" y="170" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="16"
          letter-spacing="4" fill="${style.accent}">DIGITAL EDITION</text>
    `;

    titleLines.forEach((line, index) => {
      svg += `
        <text x="300" y="${285 + index * 53}" text-anchor="middle"
          font-family="Georgia,serif" font-size="40"
          fill="${style.text}">${xmlEscape(line)}</text>
      `;
    });

    const lineY = 330 + titleLines.length * 53;

    svg += `
      <rect x="250" y="${lineY}" width="100" height="5" fill="${style.accent}"/>
    `;

    subtitleLines.forEach((line, index) => {
      svg += `
        <text x="300" y="${lineY + 55 + index * 27}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="19"
          fill="${style.text}">${xmlEscape(line)}</text>
      `;
    });

    svg += `
        <text x="300" y="700" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="22"
          fill="${style.accent}">${xmlEscape(author)}</text>
      </svg>
    `;

    const blob = new Blob([svg], {
      type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "digistudio-cover.svg";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    message.textContent =
      "Cover downloaded as SVG. You can open it in a compatible design app.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createCoverDesigner);
  } else {
    createCoverDesigner();
  }
})();
