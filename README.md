## ♟️ Online Chess Board

An interactive chess game built with **TypeScript** and **React**, featuring full support for standard chess rules and piece movements.

### 🔗 [Live Demo](https://metlis.github.io/chess-board/index.html)

---

### 📦 Features

- Drag-and-drop piece movement  
- Full rules enforcement (check, checkmate, castling, en passant, promotion) 
- Modular code structure with separate chess logic controller  

---

### 🚀 Getting Started

To run the project locally:

#### 1. Clone the repository

```bash
git clone --recurse-submodules https://github.com/metlis/chess-board.git
cd chess-board
```

If you've already cloned the repo without `--recurse-submodules`, run:
```bash
git submodule update --init --recursive --remote
```

#### 2. Install root dependencies

```bash
npm install
```

#### 3. Install dependencies for the chess_controller submodule
```bash
cd src/chess_controller
npm install
```

### 📌 Notes
* The core game logic is encapsulated in the chess_controller submodule.
* This structure allows for potential reuse of the chess engine in other projects (e.g., CLI, server, or mobile).