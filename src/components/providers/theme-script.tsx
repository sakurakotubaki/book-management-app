export function ThemeScript() {
  const script = `
    (function() {
      try {
        const mode = localStorage.getItem('book-management-app:theme-mode');
        const color = localStorage.getItem('book-management-app:theme-color');
        const root = document.documentElement;

        if (mode) {
          const parsed = JSON.parse(mode);
          if (parsed === 'light' || parsed === 'dark') {
            root.classList.add(parsed);
          }
        }

        if (color) {
          const parsed = JSON.parse(color);
          root.setAttribute('data-theme-color', parsed);
        }
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
