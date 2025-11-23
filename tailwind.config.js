/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'proactiva-purple': '#6366F1', // Cor principal baseada nos botões e logo
        'proactiva-green': '#10B981', // Cor de sucesso/tarefa concluída
        'proactiva-red': '#EF4444', // Cor de erro/perigo
        'proactiva-blue': '#3B82F6', // Cor secundária
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
