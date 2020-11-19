import React, {useMemo} from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './carousel.css'
import Slider from "react-slick";
import {Items} from '../GridItem'
import {ChevronLeft, ChevronRight} from "react-feather"
import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
    const { onClick, className, classes } = props; 
    const disabled = checkClassNameDisabled(className)
    return (
        <div
            className={`${classes.action} ${classes.nextAction} ${disabled ? 'disable' : ''}`}
            onClick={onClick}
        > 
            <ChevronLeft />
        </div>
    )
}

const checkClassNameDisabled = (className) => {
    if(className.indexOf('slick-disabled') !== -1) {
        return true
    }

    return false
}

const PrevArrow = (props) => {
    const { onClick, className, classes } = props; 
    const disabled = checkClassNameDisabled(className)
    return (
        <div
            className={`${classes.action} ${classes.prevAction} ${disabled ? 'disable' : ''}`}
            onClick={onClick}
        > 
            <ChevronRight />
        </div>
    )
}

const Carousel = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {item} = props
    const {match_products, display_additional, block_name, rule_id} = item

    const settings = {
        dots: false,
        infinite: match_products && match_products.length < 5 ? false : true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        lazyLoad: true,
        nextArrow: <NextArrow classes={classes}/>,
        prevArrow: <PrevArrow classes={classes}/>,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
        ]
    }

    const slideItems = useMemo(() => {
        return match_products.map((product, index) => (
            <Items
                classes={classes}
                key={index}
                product={product}
                displayAdditional={display_additional}
                ruleId={rule_id}
            />
        ))
    }, [
        match_products,
        display_additional,
        rule_id,
        classes
    ])

    const blockName = useMemo(() => {
        if(block_name) {
            return <h2 className={classes.blockName}>{block_name}</h2>
        }

        return null
    }, [
        block_name, 
        classes
    ])

    return (
        <div className={classes.root}>
            {blockName}
            <Slider {...settings}>
                {slideItems}
            </Slider>
        </div>
    );
    
}

export default Carousel;