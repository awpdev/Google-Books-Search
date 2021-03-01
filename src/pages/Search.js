import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container, Button } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input } from "../components/Form";

function Search() {
  // Setting our component's initial state
  const [formObject, setFormObject] = useState({});
  const [bookResults, setBookResults] = useState({});
  const [added, setAdded] = useState();

  // function to save books
  function handleAdd(id, title, authors, description, image, link) {

    //event.preventDefault();
    API.saveBook({
        key: id,
        title: title,
        authors: authors,
        description: description,
        image: image,
        link: link,
    })
    .then(res => 
        setAdded(res.title))

    .catch(err => console.log(err));
  };
  // Handles updating component state when user inputs text
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    API.searchBook(formObject.title)
      .then(res => {
            console.log(res.data.items)
            setBookResults(res.data.items)
        })
        .catch((err) => console.log(err));
}


return (
    <Container fluid>
        <Row>
            <Col size="md-6">
                <Jumbotron>
                    <h1>What Books Should I Read?</h1>
                    <div>
                        <Input
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                        />
                        <Button className="btn btn-primary"
                            disabled={!(formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Search
                        </Button>
                    </div>
                </Jumbotron>
            </Col>
        </Row>
        <Row>
            <Col size="md-6 sm-12">
                <Jumbotron>
                    <h1>Results</h1>
                </Jumbotron>
                {bookResults.length ? (
                    <List>
                        {bookResults.map(book => {
                            let id = "";
                            id = book.id;
                            let title = "";
                            if (book.volumeInfo.title === undefined) {
                                title = "No Title";
                            } else {
                                title = book.volumeInfo.title;
                            }
                            let authors = [];
                            if (book.volumeInfo.authors === undefined) {
                                authors = ["No Author"];
                            } else {
                                authors = book.volumeInfo.authors;
                            }
                            let description = "";
                            if (book.volumeInfo.description) {
                                description = book.volumeInfo.description;
                            } else {
                                description = "No description.";
                            }
                            let image = "";
                            if (book.volumeInfo.imageLinks === undefined) {
                                image = "https://placehold.it/128x128";
                            } else {
                                image = book.volumeInfo.imageLinks.thumbnail;
                            }
                            let link = "";
                            if (book.volumeInfo.previewLink) {
                                link = book.volumeInfo.previewLink
                            } else {
                                link = ""
                            }
                            return (
                                <ListItem key={id}>
                                    <Row>

                                        <img src={image} alt={title} />

                                        <Col size="md-10 md-offset-1">
                                            <article>
                                                <h2>{title}</h2>
                                                <h3>by {authors}</h3>
                                                <br />
                                                <h5>Description</h5>
                                                <p>
                                                    {description}
                                                </p>
                                            </article>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Button className="btn btn-primary" href={link} target="_blank">View</Button>
                                        <Button className="btn btn-primary" onClick={() => handleAdd(id, title, authors, description, image, link)}>Add</Button>
                                    </Row>
                                </ListItem>
                            )
                        })}
                    </List>
                ) : (
                        <h3>No Results to Display</h3>
                    )}
            </Col>
        </Row>

    </Container >


);
}

export default Search;
