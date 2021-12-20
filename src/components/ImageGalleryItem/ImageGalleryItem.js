import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';
import {memo} from 'react';

 function ImageGalleryItem({picture, onClick}) {
    return (
    <li className={css.gallery_item} onClick={()=> onClick(picture.largeImageURL)}>
  <img src={picture.webformatURL} alt={picture.tags} className={css.image}/>
</li>
    )
}

export default memo(ImageGalleryItem);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  bigImage: PropTypes.func,
};