(() => {
  const supported = ["zh-Hans", "en", "ja", "ko"];
  const aliases = { zh: "zh-Hans", "zh-CN": "zh-Hans", "zh-SG": "zh-Hans" };
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  const stored = window.localStorage.getItem("vellum-language");
  const browser = aliases[navigator.language] || navigator.language.split("-")[0];
  const initial = [requested, stored, browser, "en"].find((value) => supported.includes(value)) || "en";

  function setLanguage(language, updateURL) {
    const selected = supported.includes(language) ? language : "en";
    document.documentElement.dataset.lang = selected;
    document.documentElement.lang = selected;
    window.localStorage.setItem("vellum-language", selected);
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === selected));
    });
    if (updateURL) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", selected);
      window.history.replaceState({}, "", url);
    }
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language, true));
  });

  setLanguage(initial, false);
})();
