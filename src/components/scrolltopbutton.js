import React from "react";

import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

export class ScrollTopButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          is_visible: false
        };
      }

   componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    return (
      <div>
            <Button outline color="secondary" block onClick={() => this.scrollToTop()}>Scroll To Top</Button>
      </div>
    );
  }
}