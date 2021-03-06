# Related Product module for Magento PWA Studio


## What is this?

* A plugin that allows you to add related product display to product Details, category, checkout and cart Page.

This module acts as an add-on for [Mageplaza's Auto Related Products extension](https://www.mageplaza.com/magento-2-automatic-related-products/) to make it work with Magento PWA Studio.

End result: https://autorelated.pwa-commerce.com/shop-the-look.html?page=1

## Requirements

- Magento version 2.4.* or >= 2.3.5
- Got [Mageplaza Auto Related Products extension](https://www.mageplaza.com/magento-2-automatic-related-products/) and [Auto Related Products GraphQL](https://github.com/mageplaza/magento-2-auto-related-products-graphql) installed

## Installation

### 1. Init project
```
git clone https://github.com/Simicart/simi-studio --branch release/3.0.0
cd simi-studio
```

### 2. Start the project

From the root directory of the project you created above, clone the repository:

```
  git clone https://github.com/Simicart/autorelatedproduct-module-pwa-studio ./@simicart/related_product
```

### 3. Modify .env

Change the .env MAGENTO_BACKEND_URL with your Magento site URL, or use our demo URL:

```
  MAGENTO_BACKEND_URL=https://mp.pwa-commerce.com/
```
### 4. Modify package.json

Modify the dependencies of your project to add Shop By Brand extension.

```
  "dependencies": {
    ...
    "@simicart/related_product": "link:./@simicart/related_product",
    ...
  },
```

### 5. Install lib and Start Project

```
  yarn install && yarn watch
```

## Contribution

[SimiCart Team](https://www.simicart.com/pwa.html/) & [Mageplaza Team](https://www.mageplaza.com/)
