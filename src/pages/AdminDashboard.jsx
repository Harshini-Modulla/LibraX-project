
import { useState } from 'react'

function AdminDashboard() {
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem('books')) || []
  )

  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem('requests')) || []
  )

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')

  function addBook(e) {
    e.preventDefault()

    const newBook = {
      id: Date.now(),
      title,
      author,
      category
    }

    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))

    setTitle('')
    setAuthor('')
    setCategory('')

    alert('Book added successfully!')
  }

  function deleteBook(id) {
    const updatedBooks = books.filter((book) => book.id !== id)
    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))
  }

  function updateRequest(id, status) {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status } : request
    )

    setRequests(updatedRequests)
    localStorage.setItem('requests', JSON.stringify(updatedRequests))
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Manage your library books here.</p>

      <h3>Add New Book</h3>

      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      <h3>Available Books ({books.length})</h3>

      {books.map((book) => (
        <div key={book.id}>
          <h4>{book.title}</h4>
          <p>Author: {book.author}</p>
          <p>Category: {book.category}</p>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}

      <hr />

      <h3>Book Requests ({requests.length})</h3>

      {requests.length === 0 ? (
        <p>No book requests yet.</p>
      ) : (
        requests.map((request) => (
          <div key={request.id}>
            <h4>{request.bookTitle}</h4>
            <p>Student Name: {request.userName || 'Not available'}</p>
            <p>Student Email: {request.userEmail || 'Not available'}</p>
            <p>Status: {request.status}</p>

            {request.status === 'Pending' && (
              <>
                <button onClick={() => updateRequest(request.id, 'Approved')}>
                  Approve
                </button>

                <button onClick={() => updateRequest(request.id, 'Rejected')}>
                  Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default AdminDashboard
