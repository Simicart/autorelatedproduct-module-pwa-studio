import React, {useMemo} from 'react';
import defaultClasses from './items.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Link, resourceUrl } from '@magento/venia-drivers';
import {convertStringToArray} from '../../util/convertString'
import { Price } from '@magento/peregrine';
import {Heart} from 'react-feather'
import {useGridItem} from '../../talons/MpARP/useGridItem'
import Image from '@magento/venia-ui/lib/components/Image';
import Button from '@magento/venia-ui/lib/components/Button';
import * as Constants from '../../constants'

const Item = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {product, displayAdditional, ruleId} = props;
    const { name, price, small_image, url_key, url_suffix } = product;
    const arrDisplayAdditional = convertStringToArray(displayAdditional)

    const talonProps = useGridItem({
        ruleId,
        product
    })

    const {
        handleAddToCart,
        handleClickItem,
        isAddSimpleLoading,
        errorAddingSimpleProduct,
    } = talonProps

    const productPrice = useMemo(() => {
        if(arrDisplayAdditional.includes(String(Constants.DISPLAY_ADDITIONAL_PRICE))) {
            return (
                <div className={classes.price}>
                    <Price
                        value={price.regularPrice.amount.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                </div>
            )
        }

        return null
    }, [
        classes,
        price,
        arrDisplayAdditional
    ])

    const addToCartButton = useMemo(() => {
        if(arrDisplayAdditional.includes(String(Constants.DISPLAY_ADDITIONAL_ADDTOCART))) {
            return (
                <section className={classes.cartActions}>
                    <Button
                        priority="high"
                        onClick={handleAddToCart}
                        disabled={isAddSimpleLoading}
                    >
                        Add to Cart
                    </Button>
                </section>
            )
        }

        return null;
    }, [
        handleAddToCart,
        isAddSimpleLoading,
        arrDisplayAdditional, 
        classes
    ])
    
    const addToWishList = useMemo(() => {
        if(arrDisplayAdditional.includes(String(Constants.DISPLAY_ADDITIONAL_ADDTOWISHLIST))) {
            return (
                <section className={classes.wishlistAction}>
                    <div>
                        <Heart />
                    </div>
                </section>
            )
        }

        return null;
    }, [arrDisplayAdditional, classes])

    const productLink = resourceUrl(`/${url_key}${url_suffix}`);

    return (
        <div className={classes.gridItem} >
            <Link to={productLink} className={classes.images}>
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        root: classes.imageContainer
                    }}
                    src={small_image.url}
                    width={'100%'}
                    height={'100%'}
                />
            </Link>
            <Link to={productLink} className={classes.name}>
                <span>{name}</span>
            </Link>
            {productPrice}
            <div className={classes.actionBlock}>
                {addToCartButton}
                {addToWishList}
            </div>
        </div>
    );

}

export default Item;