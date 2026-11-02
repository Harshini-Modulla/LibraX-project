
import { useState } from 'react'

function UserDashboard({ currentUser }) {
  const [books] = useState(() =>
    JSON.parse(localStorage.getItem('books')) || []
  )

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [requests, setRequests] = useState(() =>
    JSON.parse(localStorage.getItem('requests')) || []
  )

  // Get unique book categories
  const categories = [
    'All',
    ...new Set(books.map((book) => book.category).filter(Boolean))
  ]

  // Search and category filter
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      book.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Student requests
  const myRequests = requests.filter(
    (request) => request.userEmail === currentUser.email
  )

  const pendingBooks = myRequests.filter(
    (request) => request.status === 'Pending'
  )

  const approvedBooks = myRequests.filter(
    (request) => request.status === 'Approved'
  )

  const rejectedBooks = myRequests.filter(
    (request) => request.status === 'Rejected'
  )

  // Request a book
  function requestBook(book) {
    const alreadyRequested = requests.some(
      (request) =>
        request.bookTitle === book.title &&
        request.userEmail === currentUser.email
    )

    if (alreadyRequested) {
      alert('You have already requested this book!')
      return
    }

    const newRequest = {
      id: Date.now(),
      bookTitle: book.title,
      userName: currentUser.name,
      userEmail: currentUser.email,
      status: 'Pending'
    }

    const updatedRequests = [...requests, newRequest]

    setRequests(updatedRequests)
    localStorage.setItem('requests', JSON.stringify(updatedRequests))

    alert('Book request submitted successfully!')
  }

  // Book cover
  function getBookCover(title) {
    if (title.trim().toLowerCase() === 'python crash course') {
      return 'https://covers.openlibrary.org/b/olid/OL34011705M-L.jpg'
    }

    return `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`
  }

  return (
    <div className="user-dashboard">

      {/* Welcome Section */}
      <div className="user-hero">
        <div>
          <span className="user-tag">LIBRAX DIGITAL LIBRARY</span>
          <h1>Welcome, {currentUser.name}!</h1>
          <p>Discover knowledge. Explore books. Grow every day.</p>
        </div>

        <div className="hero-book-icon">📚</div>
      </div>

      {/* Dashboard Statistics */}
      <div className="user-stats">

        <div className="user-stat-card">
          <span>📚</span>
          <h2>{books.length}</h2>
          <p>Available Books</p>
        </div>

        <div className="user-stat-card">
          <span>📋</span>
          <h2>{myRequests.length}</h2>
          <p>Total Requests</p>
        </div>

        <div className="user-stat-card">
          <span>⏳</span>
          <h2>{pendingBooks.length}</h2>
          <p>Pending Books</p>
        </div>

        <div className="user-stat-card">
          <span>✅</span>
          <h2>{approvedBooks.length}</h2>
          <p>Approved Books</p>
        </div>

        <div className="user-stat-card">
          <span>❌</span>
          <h2>{rejectedBooks.length}</h2>
          <p>Rejected Books</p>
        </div>

      </div>

      {/* Explore Library */}
      <section className="user-section">

        <span className="user-section-label">EXPLORE LIBRARY</span>

        <h2>Available Books</h2>

        <p>Find your next favourite book.</p>

        {/* Search */}
        <input
          className="book-search"
          type="text"
          placeholder="🔍 Search books by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="book-search"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>

        {/* Book Grid */}
        <div className="user-book-grid">

          {filteredBooks.length === 0 ? (
            <p className="user-empty">No books found.</p>
          ) : (
            filteredBooks.map((book) => (
              <div className="user-book-card" key={book.id}>

                <div className="user-book-cover">

                  <img
                    src={getBookCover(book.title)}
                    alt={book.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                  />

                  <div className="book-cover-fallback">
                    📚
                    <span>{book.title}</span>
                  </div>

                </div>

                <div className="user-book-info">
                  <h3>{book.title}</h3>
                  <p>✍️ {book.author}</p>
                  <span>{book.category}</span>
                </div>

                <button
                  className="user-request-button"
                  onClick={() => requestBook(book)}
                >
                  Request Book →
                </button>

              </div>
            ))
          )}

        </div>
      </section>

      {/* My Book Requests */}
      <section className="user-section">

        <span className="user-section-label">YOUR ACTIVITY</span>

        <h2>My Book Requests</h2>

        <p>Track the status of your book requests.</p>

        <div className="my-request-list">

          {myRequests.length === 0 ? (
            <p className="user-empty">
              You have not requested any books yet.
            </p>
          ) : (
            myRequests.map((request) => (
              <div className="my-request-card" key={request.id}>

                <div className="request-book-icon">📕</div>

                <div className="request-book-info">
                  <h3>{request.bookTitle}</h3>
                  <p>Request Status</p>
                </div>

                <span
                  className={`request-status ${
                    request.status === 'Approved'
                      ? 'status-approved'
                      : request.status === 'Rejected'
                      ? 'status-rejected'
                      : 'status-pending'
                  }`}
                >
                  {request.status}
                </span>

              </div>
            ))
          )}

        </div>
      </section>

      {/* Footer */}
      <div className="user-footer">
        <p>📚 LibraX — Your Gateway to Knowledge</p>
      </div>

    </div>
  )
}

export default UserDashboard
