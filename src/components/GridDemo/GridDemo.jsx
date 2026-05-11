import './GridDemo.css';
export default function GridDemo() {
  return (
    <div className="holy-grail">
      <header>顶部（固定高度）</header>
      <nav>左侧（固定宽度）</nav>
      <main>中间（自适应）</main>
      <aside>右侧（固定宽度）</aside>
      <footer>底部（固定高度）</footer>
    </div>
  );
}
