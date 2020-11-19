import React, { Fragment, Suspense } from 'react';
import { array, shape, string } from 'prop-types';
import RichContent from '@magento/venia-ui/lib/components/RichContent';

import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';

import NoProductsFound from '@magento/venia-ui/lib/RootComponents/Category/NoProductsFound';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Gallery from '@magento/venia-ui/lib/components/Gallery';
import ProductSort from '@magento/venia-ui/lib/components/ProductSort';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import defaultClasses from '@magento/venia-ui/lib/RootComponents/Category/category.css';
import GET_PRODUCT_FILTERS_BY_CATEGORY from '@magento/venia-ui/lib/queries/getProductFiltersByCategory.graphql';
import Button from '@magento/venia-ui/lib/components/Button';

// custom import 
import MpARProduct from '../../../componets/MpARProduct'
import {useARProduct} from '../../../talons/MpARP/useARProduct'
import * as Constants from '../../../constants'
// end custom import 

const FilterModal = React.lazy(() => import('@magento/venia-ui/lib/components/FilterModal'));

const CategoryContent = props => {
    const { categoryId, data, pageControl, sortProps } = props;
    const [currentSort] = sortProps;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        queries: {
            getProductFiltersByCategory: GET_PRODUCT_FILTERS_BY_CATEGORY
        }
    });

    // custom call use auto related product talon
    const arpProductProps = useARProduct({
        page: Constants.CATEGORY_PAGE,
        categoryId
    })
    // end custom

    const {
        categoryName,
        categoryDescription,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const maybeFilterButtons = filters ? (
        <Button
            priority={'low'}
            classes={{ root_lowPriority: classes.filterButton }}
            onClick={handleOpenFilters}
            onFocus={handleLoadFilters}
            onMouseOver={handleLoadFilters}
            type="button"
        >
            {'Filter'}
        </Button>
    ) : null;

    const maybeSortButton = totalPagesFromData ? (
        <ProductSort sortProps={sortProps} />
    ) : null;

    const maybeSortContainer = totalPagesFromData ? (
        <div className={classes.sortContainer}>
            {'Items sorted by '}
            <span className={classes.sortText}>{currentSort.sortText}</span>
        </div>
    ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters} /> : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription} />
    ) : null;

    const content = totalPagesFromData ? (
        <Fragment>
            <section className={classes.gallery}>
                <Gallery items={items} />
            </section>
            <div className={classes.pagination}>
                <Pagination pageControl={pageControl} />
            </div>
        </Fragment>
    ) : (
        <NoProductsFound categoryId={categoryId} />
    );

    return (
        <Fragment>
            <Breadcrumbs categoryId={categoryId} />
            <MpARProduct location={Constants.LOCATION_ABOVE_CONTENT} arpProduct={arpProductProps} />
            <Title>{pageTitle}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{categoryName}</div>
                </h1>
                {categoryDescriptionElement}
                <div className={classes.headerButtons}>
                    {maybeFilterButtons}
                    {maybeSortButton}
                </div>
                {maybeSortContainer}
                {content}
                <Suspense fallback={null}>{modal}</Suspense>
            </article>
            <MpARProduct location={Constants.LOCATION_BELOW_CONTENT} arpProduct={arpProductProps} />
            <MpARProduct location={Constants.LOCATION_LEFT_POPUP_CONTENT} arpProduct={arpProductProps} />
            <MpARProduct location={Constants.LOCATION_RIGHT_POPUP_CONTENT} arpProduct={arpProductProps} />
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        sortContainer: string,
        gallery: string,
        headerButtons: string,
        filterButton: string,
        pagination: string,
        root: string,
        title: string
    }),
    // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array
};
