/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
module.exports = componentOverride = {
    [`@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js`]: '@simicart/related_product/src/override/ProductDetails/productFullDetail.js',
    ['@magento/venia-ui/lib/RootComponents/Category/categoryContent.js']:'@simicart/related_product/src/override/Category/categoryContent.js',
    ['@magento/venia-ui/lib/components/CartPage']:'@simicart/related_product/src/override/Cart/CartPage.js',
    ['@magento/venia-ui/lib/components/CheckoutPage']:'@simicart/related_product/src/override/Checkout/checkoutPage.js'

};
