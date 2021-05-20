///
/// use snake_case for event logging function. this is to match global pattern for all the analytics events.
/// this naming convention follows only for analytics.
///

import { event } from ".";

export function event_page_view(page: "code" | "design") {
  event({
    name: "page_view",
    params: {
      page_path: undefined,
      page_title: page,
    },
  });
}

export function event_selection_to_code(params: {
  framework: "flutter" | "react";
}) {
  event({
    name: "selection_to_code",
    params: {
      framework: params.framework,
    },
  });
}

export function event_click_copy_code() {
  event({
    name: "click_copy_code",
    params: {},
  });
}

export function event_click_quicklook() {
  event({
    name: "click_quicklook",
    params: {},
  });
}

export function event_load_icon(params: { icon_name: string }) {
  event({
    name: "load_icon",
    params: {
      icon_name: params.icon_name,
    },
  });
}
