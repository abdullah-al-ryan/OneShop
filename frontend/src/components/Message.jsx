import React from 'react';
import { Alert } from 'react-bootstrap';

// children is whatever we are wrapping inside the Message component
// variant is the type of message we want to display
const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>{children}</Alert>
  )
}

Message.defaultProps = {
    variant: 'info',
};

export default Message;
