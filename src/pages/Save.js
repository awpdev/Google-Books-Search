import React, { useState, useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';

import { Col, Row, Container, Button } from 'react-bootstrap';
import { List, ListItem } from '../components/List';
import DeleteBtn from '../components/DeleteBtn';

function Save() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                      <p>{book.description}</p>
                      <img src={book.image} alt="bookimg"></img>
                    <Button type="button" className="btn btn-primary" href={book.link} target="_blank">View Book</Button>
                    <DeleteBtn onClick={() => deleteBook(book._id)}>Delete</DeleteBtn>
                  </ListItem> 
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Save;
