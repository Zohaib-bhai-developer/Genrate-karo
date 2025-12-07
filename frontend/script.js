const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const resultDiv = document.getElementById("result");
const loadingDiv = document.getElementById("loading");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value;
  if (!prompt) return alert("Please enter a prompt");

  loadingDiv.style.display = "block";
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.success) {
      const img = document.createElement("img");
      img.src = data.url;
      resultDiv.appendChild(img);
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    loadingDiv.style.display = "none";
  }
});
