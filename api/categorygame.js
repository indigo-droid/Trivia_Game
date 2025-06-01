document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    { id: "arts_and_literature", name: "Arts & Literature" },
    { id: "film_and_tv", name: "Film & TV" },
    { id: "food_and_drink", name: "Food & Drink" },
    { id: "general_knowledge", name: "General Knowledge" },
    { id: "geography", name: "Geography" },
    { id: "history", name: "History" },
    { id: "music", name: "Music" },
    { id: "science", name: "Science" },
    { id: "society_and_culture", name: "Society & Culture" },
    { id: "sport_and_leisure", name: "Sport & Leisure" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const difficulties = ["easy", "medium", "hard"].map(d => ({
    id: d,
    name: d.charAt(0).toUpperCase() + d.slice(1)
  }));

  let selectedCategory = null;
  let selectedDifficulty = null;

  function createOptionButtons(containerId, options, isCategory) {
    const container = document.getElementById(containerId);
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.name;
      btn.classList.add("option-button");
      btn.onclick = () => {
        [...container.children].forEach(child => child.classList.remove("selected"));
        btn.classList.add("selected");
        if (isCategory) selectedCategory = opt.id;
        else selectedDifficulty = opt.id;
        document.getElementById("startGame").disabled = !(selectedCategory && selectedDifficulty);
      };
      container.appendChild(btn);
    });
  }

  createOptionButtons("category-options", categories, true);
  createOptionButtons("difficulty-options", difficulties, false);

  document.getElementById("startGame").onclick = () => {
    const params = new URLSearchParams();
    params.append("category", selectedCategory);
    params.append("difficulty", selectedDifficulty);
    window.location.href = "quiz.html?" + params.toString();
  };
});