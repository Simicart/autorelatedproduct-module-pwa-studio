import React, {useMemo} from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Grid from './grid';
import Carousel from './carousel';
import * as Constants from '../../constants'
import defaultClasses from './gallery.css'

const Gallery = props => {
    const {item} = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {product_layout} = item;

    const gallery = useMemo(() => {
        if(product_layout === Constants.PRODUCT_LAYOUT_GRID) {
            return <Grid item={item}/>
        } else if(product_layout === Constants.PRODUCT_LAYOUT_SLIDER) {
            return <Carousel item={item}/>
        }
        return null
    }, [
        product_layout, 
        item
    ])

    return (
        <div className={classes.root}>
            {gallery}
        </div>
    );
    
}

export default Gallery;