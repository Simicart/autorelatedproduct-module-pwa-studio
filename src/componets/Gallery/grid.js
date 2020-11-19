import React, { useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './grid.css';
import {Items} from '../GridItem';

const Grid = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {item} = props;
    const {match_products, display_additional, block_name, rule_id} = item
    console.log(rule_id)
    const grid = useMemo(() => {
        return match_products.map((product, index) => {
            return <Items 
                        classes={classes}
                        product={product}
                        displayAdditional={display_additional}
                        ruleId={rule_id}
                        key={index}/>
        })
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
            <div className={classes.wrapper}>
                {grid}
            </div>
        </div>
    );

}

export default Grid;