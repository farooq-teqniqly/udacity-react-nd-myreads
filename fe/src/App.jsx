import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { useBookshelves } from "./hooks/useBookshelves";
import { useBooks } from "./hooks/useBooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
// import { useBookSearch } from "./hooks/useBookSearch";
// import { useAPI } from "./hooks/useAPI";
import { Button } from "./components/Button";
import { Search } from "./components/Search";

function App() {
  const {
    getWantToReadBookshelf,
    getCurrentlyReadingBookshelf,
    getAlreadyReadBookshelf,
  } = useBookshelves();

  const { getWantToReadBooks, getCurrentlyReadingBooks, getAlreadyReadBooks } =
    useBooks(useLocalStorage());

  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <Search onClose={() => setShowSearchpage(false)} />
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                books={getWantToReadBooks()}
                bookshelf={getWantToReadBookshelf()}
              />
              <Bookshelf
                books={getCurrentlyReadingBooks()}
                bookshelf={getCurrentlyReadingBookshelf()}
              />
              <Bookshelf
                books={getAlreadyReadBooks()}
                bookshelf={getAlreadyReadBookshelf()}
              />
            </div>
          </div>
          <div className="open-search">
            <Button
              text="Add a book"
              onButtonClicked={() => setShowSearchpage(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
