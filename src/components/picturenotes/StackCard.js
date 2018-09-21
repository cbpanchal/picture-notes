import React, { PureComponent } from "react";
import '../../style/PictureNotesStyle.css';

class StackCard extends PureComponent {

  constructor(props) {
    super(props);

  }

  render() {
    const { images } = this.props;
    return(
      <div className="stack-container">
        <ul className="stack">
          {images.map((img, i) => {
            console.log(img);
            return ( 
              <li key ={i} className="stack-item">
                <img src={img} alt="Picture note"/>
              </li>
            )
          })}
        </ul>	
    </div>
    );
  }

}

export default StackCard;