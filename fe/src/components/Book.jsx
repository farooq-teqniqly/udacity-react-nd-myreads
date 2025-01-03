import { useState } from "react";
import { BookPropType, BookshelfPropType } from "../prop-types/propTypes";
import PropTypes from "prop-types";
import { useBookshelves } from "../hooks/useBookshelves";

export const Book = ({ book, bookshelves, onShelfChanged }) => {
  const { BOOKSHELF_NONE } = useBookshelves();
  const [selectedShelf, setSelectedShelf] = useState(BOOKSHELF_NONE);
  const { id, title, authors, imageUrl } = book;

  const handleShelfChange = (newShelfId, bookId) => {
    setSelectedShelf(newShelfId);
    onShelfChanged(newShelfId, bookId);
  };

  return (
    <div id={id} className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            defaultValue="separator"
            onChange={(e) => handleShelfChange(e.target.id, id)}
          >
            <option id="move-to" value="move-to" disabled>
              Move to...
            </option>
            <option value="separator" disabled>
              -----
            </option>
            {bookshelves.map((bookshelf) => (
              <option key={bookshelf.id} id={bookshelf.id} value={bookshelf.id}>
                {bookshelf.title} {selectedShelf === bookshelf.id ? "✓" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};

Book.propTypes = {
  book: BookPropType.isRequired,
  bookshelves: PropTypes.arrayOf(BookshelfPropType).isRequired,
  onShelfChanged: PropTypes.func.isRequired,
};
