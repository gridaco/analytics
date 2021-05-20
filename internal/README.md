## Installation

```
yarn add @internal.bridged.xyz/analytics
```

## What data do we collect?

We collect general user usage events such as signin/signup, click events and more. this is for understanding usage patterns and improving the UX of our products.
We don't collect any suspicious data. All the general events/data we collect is clear and open via this repository. Feel free to file an issue about privacy in this action.

## Proxy analytics server

proxy analytics is a analytics data proxy service that could run on google analytics or bridged analytics for sdk non-supported platforms. e.g. iframe and embedded

## Usage

> This package is designed for singleton client usage. we are currently adopting functions and global variable patterns to keep it simple as possible.

```ts
import { assistant as analytics } from "analytics";
analytics.initWithProxy(secret); // with proxy
analytics.eventData();
analytics.event();
analytics.event_a();
analytics.set();
analytics.get();
```
