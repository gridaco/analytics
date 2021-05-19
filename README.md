# analytics
Bridged internal analytics components


## Note
> this package is used for tracking bridged's products' analytics data. this is opened, but there is nothing much you can do with this if you are a outside collaborator of bridged. In the future, this will be develped as a General cloud analytics tool. You can Watch release for this. But this is not planned atleast until 2021 Q4


## Installation
```
yarn add @internal.bridged.xyz/analytics
```

## What data do we collect?
We collect general user usage events such as signin/signup, click events and more. this is for understanding usage patterns and improving the UX of our products.
We don't collect any suspicious data. All the general events/data we collect is clear and open via this repository. Feel free to file an issue about privacy in this action.


## Proxy analytics server
proxy analytics is a analytics data proxy service that could run on google analytics or bridged analytics for sdk non-supported platforms. e.g. iframe and embedded
