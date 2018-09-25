import React, { PureComponent } from "react";
import '../../style/PictureNotesStyle.css';
import { Typography } from "@material-ui/core";
class StackCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const { cardStack, handleClick } = this.props;
    return(
      <div className="stack-container">
        <ul className="stack">
          {cardStack.map((card, i) => {
            return ( 
              <li key ={card.id} className="stack-item" onClick={() => handleClick(cardStack)}>
                <img src={card.thumbnailUrl} alt={card.title || ''}/>
                <div className="stack-card-note">
                  <Typography
                    gutterBottom
                    variant="headline"
                    component="h4"
                    className="pull-left"
                    align="left"
                  >
                    {card.title || ''}
                  </Typography>
                  <Typography 
                    component="p"
                    align="left"
                  >
                   {card.note || ''}
                  </Typography>
                </div>
              </li>
            )
          })}
        </ul>	
    </div>
    );
  }

}

export default StackCard;