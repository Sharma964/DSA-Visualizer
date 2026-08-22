# DSA Visualizer

**Learn. Visualize. Master.**

An interactive educational platform that helps students understand Data Structures and Algorithms through step-by-step visualizations. Every algorithm runs live in your browser — no backend, no setup, just open and learn.

![DSA Visualizer](https://images.unsplash.com/photo-1555066931-cf5e8c1a1f9b?w=1200)

## Project Description

DSA Visualizer is a modern, developer-focused web application built to make abstract data structures and algorithms tangible. Instead of reading pseudocode, students watch each comparison, swap, and traversal happen in real time, with clear status messages and complexity information alongside every algorithm.

It is designed for computer science students, self-taught programmers, and anyone preparing for coding interviews.

## Features

- **8 Interactive Visualizers** — Arrays, Searching, Sorting, Linked List, Stack, Queue, Trees, and Graphs
- **5 Sorting Algorithms** — Bubble, Selection, Insertion, Merge, and Quick Sort with comparison/swap/sorted animations
- **2 Searching Algorithms** — Linear and Binary Search with live target tracking
- **Binary Search Tree** — Insert, delete, search, and all four traversals (Inorder, Preorder, Postorder, Level Order)
- **Graph Algorithms** — Build custom graphs and run BFS, DFS, and Shortest Path animations
- **Full Playback Controls** — Start, Pause, Step, and Reset for every algorithm
- **Speed Control** — Adjust animation speed from 1x to 10x
- **Algorithm Info Panel** — Description, step-by-step explanation, and time/space complexity for every algorithm
- **Code View** — View the actual JavaScript implementation of each algorithm with one-click copy
- **Complexity Comparison** — Side-by-side comparison tables for all sorting, searching, and data structure complexities
- **Progress Tracker** — Mark topics as completed and track your DSA journey (saved locally)
- **Responsive Design** — Works on desktop, tablet, and mobile with a collapsible sidebar
- **Dark Modern Theme** — Clean, glass-morphism UI suitable for portfolio screenshots

## Technologies Used

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **Lucide React** — Icon system

## Supported Algorithms

### Sorting
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

### Searching
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |

### Graph
| Algorithm | Complexity | Space |
|-----------|------------|-------|
| BFS | O(V + E) | O(V) |
| DFS | O(V + E) | O(V) |
| Shortest Path (BFS) | O(V + E) | O(V) |

## Screenshots

> Add your screenshots here. Recommended captures:
>
> - Dashboard with the 8 topic cards and progress journey
> - Sorting visualizer mid-animation (bars with compare/swap highlights)
> - Binary Search Tree with an active traversal
> - Graph visualizer running BFS with visited nodes highlighted
> - Algorithm comparison tables
>
> ```md
> ![Dashboard](./screenshots/dashboard.png)
> ![Sorting](./screenshots/sorting.png)
> ![Trees](./screenshots/trees.png)
> ![Graphs](./screenshots/graphs.png)
> ```

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dsa-visualizer.git

# Navigate to the project directory
cd dsa-visualizer

# Install dependencies
npm install
```

## How to Run Locally

```bash
# Start the development server
npm run dev

# Open your browser to the URL shown in the terminal (usually http://localhost:5173)
```

### Other Scripts

```bash
npm run build      # Build for production
npm run preview    # Preview the production build
npm run typecheck  # Run TypeScript type checking
npm run lint       # Run ESLint
```

## Project Structure

```
dsa-visualizer/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── main.tsx                  # App entry point
    ├── App.tsx                   # Root component + routing
    ├── index.css                 # Global styles + Tailwind layers
    ├── components/
    │   ├── Layout.tsx            # Sidebar + Header navigation
    │   ├── Footer.tsx            # Footer
    │   ├── VisualizerPage.tsx    # Shared page wrapper
    │   ├── ArrayBars.tsx         # Reusable animated bar component
    │   ├── PlaybackControls.tsx  # Start/Pause/Step/Reset + speed
    │   ├── InfoPanel.tsx         # Algorithm info + code toggle
    │   └── CodePanel.tsx         # Code viewer with copy button
    ├── data/
    │   └── algorithms.ts        # All algorithm metadata + code snippets
    ├── hooks/
    │   └── usePlayback.ts       # Step-based animation engine
    ├── lib/
    │   ├── sorting.ts           # Sorting step generators
    │   ├── searching.ts         # Searching step generators
    │   └── tree.ts              # BST logic + traversal generators
    ├── pages/
    │   ├── Dashboard.tsx        # Landing page with topic cards
    │   ├── SortingVisualizer.tsx
    │   ├── SearchingVisualizer.tsx
    │   ├── LinkedListVisualizer.tsx
    │   ├── StackVisualizer.tsx
    │   ├── QueueVisualizer.tsx
    │   ├── TreeVisualizer.tsx
    │   ├── GraphVisualizer.tsx
    │   ├── AlgorithmsPage.tsx    # Complexity comparison tables
    │   └── AboutPage.tsx
    └── state/
        ├── nav.tsx              # Simple route context
        └── progress.tsx         # Progress tracking (localStorage)
```

## Future Improvements

- **More Algorithms** — Heap Sort, Radix Sort, Dijkstra's, A* pathfinding
- **Code Syntax Highlighting** — Integrate a highlighter like Prism or Shiki
- **Custom Test Cases** — Let users input their own arrays and datasets
- **Algorithm Quizzes** — Self-assessment questions after each topic
- **Export Progress** — Save and share progress reports
- **Internationalization** — Multi-language support
- **Persistence** — Sync progress across devices with a backend

## Author

Built by **Your Name**

- GitHub: [https://github.com/your-username](https://github.com/your-username)
- LinkedIn: [https://linkedin.com/in/your-username](https://linkedin.com/in/your-username)

---

*DSA Visualizer — Learn. Visualize. Master.*
