import React from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from 'prop-types';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { Price } from '@magento/peregrine';
import {useGridItem} from '../../talons/MpARP/useGridItem'
import Image from '@magento/venia-ui/lib/components/Image';
import Button from '@magento/venia-ui/lib/components/Button';
import defaultClasses from './item.css';

const Item = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {product, blockName, ruleId} = props;
    const { name, price, small_image, url_key, url_suffix } = product;

    const talonProps = useGridItem({
        product,
        ruleId
    })

    const {
        handleAddToCart,
        handleClickItem,
        isAddSimpleLoading,
        // errorAddingSimpleProduct,
    } = talonProps

    const productLink = resourceUrl(`/${url_key}${url_suffix}`);

    return (
        <div className={classes.root}>
            <div className={classes.columnLeft}>
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        root: classes.imageContainer
                    }}
                    src={small_image.url}
                    width={135}
                    height={'auto'}
                />
            </div>
            <div className={classes.columnRight}>
                <div className={classes.title}>
                    <span>{blockName}</span>
                </div>
                <Link onClick={handleClickItem} to={productLink} className={classes.name}>
                    <span>{name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={price.regularPrice.amount.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                </div>
                <section className={classes.cartActions}>
                    <Button
                        priority="high"
                        onClick={handleAddToCart}
                        disabled={isAddSimpleLoading}
                    >
                        Add to Cart
                    </Button>
                </section> 
            </div>
            
        </div>
    );
}

Item.propTypes = {
    classes: shape({root: string})
};

Item.defaultProps = {};

export default Item;