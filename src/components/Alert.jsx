// src/components/Alert.jsx

import { Component, useEffect, useState } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)'; // blue
    this.bgColor = 'rgb(220, 220, 255)'; // light blue
  }
}

// --- ADD ERRORALERT ---
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // red
    this.bgColor = 'rgb(255, 220, 220)' // light red
  }
}

const WarningAlert = ({ text }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 5000); // The alert will disappear after 5 seconds

    return() => {
      clearTimeout(timeout);
    };
  }, [text]);

  if(text && show) {
    return (
      <p className="Alert warning-alert">
        {text}
      </p>
    );
  }
  return null;
};

export { InfoAlert, ErrorAlert, WarningAlert }; // Make sure you export WarningAlert