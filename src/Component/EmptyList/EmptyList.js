import React from 'react';
import classes from './EmptyList.css';

const EmptyList = (props) => {
  return (
    <div className={classes.empty_list}>
        <p className={classes.empty_caption}>{props.messege}</p>
    </div>
  )
}

export default EmptyList;
