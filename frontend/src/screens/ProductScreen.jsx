import React from 'react';
import { useState } from 'react';
import {  Link, useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {

  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1); // qty is the quantity of the product that we want to add to the cart, we are setting it to 1 by default, we will change it later on the product screen, we will have a select dropdown for the quantity,

  const [rating, setRating] = useState(0); // rating is the rating that the user will give to the product, we are setting it to 0 by default, we will change it later on the product screen, we will have a select dropdown for the rating,

  const [comment, setComment] = useState(''); // comment is the comment that the user will give to the product, we are setting it to an empty string by default, we will change it later on the product screen, we will have a select dropdown for the comment,

  const { data: product, isLoading, refetch,  error } = useGetProductDetailsQuery(productId); // productId is coming because of the use params hook

  const [ createReview, { isLoading: loadingProductReview } ] = useCreateReviewMutation(); // we are destructuring the createReview function from the useCreateReviewMutation hook, we are also destructuring the isLoading and error properties from the useCreateReviewMutation hook, we are setting the default value of isLoading to isLoadingReview and the default value of error to errorReview

  const {userInfo} = useSelector((state) => state.auth); // we are destructuring the userInfo object from the userLogin property of the state, this will give us the user info of the logged in user

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); // we are dispatching the addToCart action creator, we are passing the product and the quantity

    navigate('/cart'); // we are navigating to the cart screen
  };

  const submitHandler = async (e) => {
    e.preventDefault(); 
    try{
        await createReview({ productId, rating, comment }).unwrap(); // we are calling the createReview function, we are passing the productId, rating and comment as arguments, we are awaiting the createReview function because it is an async function
      
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    }
      catch(err){
        toast.error(err?.data?.message || err.error);
    }
  }
    


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      { isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) :  (
      <>
        <Meta title={product.name} />
        <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control 
                        as='select' 
                        value={qty} 
                        onChange={(e) => setQty(Number(e.target.value))}>

                          {/* number in stock */}
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x+1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroupItem>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {product.reviews.map((review) => (
                <ListGroupItem key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating}></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroupItem>
              ))}
              <ListGroupItem>
                <h2>Write a Customer Review</h2>

                {loadingProductReview && <Loader></Loader>}
                {error && <Message variant='danger'>{ error?.data?.message || error.error }</Message>}

                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating' className='my-2'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}  
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comment' className='my-2'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type='submit'
                      variant='primary'
                      disabled={loadingProductReview}
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review{' '}
                  </Message>
                )}

              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </>
      ) } 

      
    </>
  );
};

export default ProductScreen;
