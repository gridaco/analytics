export type AssistantEvent = AssistantSignin;

const __ASSISTANT_NAMESPAGE = "s1-assistant.bridged.xyz";

export interface AssistantSignin {
  namespage: typeof __ASSISTANT_NAMESPAGE;
  event: "assistant.bridged.xyz/signin";
}

export interface AssistantPageview {
  namespage: typeof __ASSISTANT_NAMESPAGE;
  event: "page_view";
}
