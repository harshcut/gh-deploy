import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import mdx from "vite-plugin-mdx";

const options = {
  remarkPlugins: [],
  rehypePlugins: [],
};

export default defineConfig({
  plugins: [reactRefresh(), mdx(options)],
});
