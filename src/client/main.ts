import "./app.css";
import Alpine from "alpinejs";

declare global {
  interface Window {
    Alpine: typeof Alpine;
    lucide: { createIcons: (opts?: object) => void };
  }
}

Alpine.data("jadiwebPage", () => ({
  faqOpen: -1 as number,
  menuOpen: false,

  toggleFaq(i: number) {
    (this as any).faqOpen = (this as any).faqOpen === i ? -1 : i;
  },
}));

window.Alpine = Alpine;
Alpine.start();

window.addEventListener("load", () => {
  if (window.lucide) window.lucide.createIcons();

  const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = parseInt(el.dataset["delay"] ?? "0");
          setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));
});
